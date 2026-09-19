from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from geoalchemy2.shape import from_shape, to_shape
from shapely.geometry import Polygon, mapping
from .database import Base, engine, get_db
from .models import User, Project, Site
from .schemas import RegisterIn, LoginIn, Token, UserOut, ProjectIn, ProjectOut, SiteIn, SiteOut
from .auth import hash_password, verify_password, create_token, current_user

app = FastAPI(title="Darukaa.Earth API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    # PostGIS must exist before SQLAlchemy creates the geometry column.
    with engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
    Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Darukaa.Earth API is running"}

@app.post("/auth/register", response_model=UserOut)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(400, "Email already registered")
    user = User(name=data.name, email=data.email, password_hash=hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.post("/auth/login", response_model=Token)
def login(data: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(401, "Invalid email or password")
    return {"access_token": create_token(user.id), "token_type": "bearer"}

@app.get("/me", response_model=UserOut)
def me(user=Depends(current_user)):
    return user

@app.get("/projects", response_model=list[ProjectOut])
def projects(db: Session = Depends(get_db), user=Depends(current_user)):
    return db.query(Project).filter(Project.owner_id == user.id).order_by(Project.id.desc()).all()

@app.post("/projects", response_model=ProjectOut)
def create_project(data: ProjectIn, db: Session = Depends(get_db), user=Depends(current_user)):
    project = Project(name=data.name, description=data.description or "", owner_id=user.id)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@app.get("/projects/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db), user=Depends(current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    return project

def site_output(site):
    geom = to_shape(site.geometry)
    return SiteOut(
        id=site.id,
        project_id=site.project_id,
        name=site.name,
        area_hectares=site.area_hectares,
        carbon_stock=site.carbon_stock,
        biodiversity_score=site.biodiversity_score,
        tree_cover=site.tree_cover,
        geometry={"type": "Polygon", "coordinates": mapping(geom)["coordinates"]},
    )

@app.get("/projects/{project_id}/sites", response_model=list[SiteOut])
def get_sites(project_id: int, db: Session = Depends(get_db), user=Depends(current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    return [site_output(s) for s in db.query(Site).filter(Site.project_id == project_id).all()]

@app.post("/projects/{project_id}/sites", response_model=SiteOut)
def create_site(project_id: int, data: SiteIn, db: Session = Depends(get_db), user=Depends(current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == user.id).first()
    if not project:
        raise HTTPException(404, "Project not found")
    if len(data.coordinates) < 1 or len(data.coordinates[0]) < 4:
        raise HTTPException(400, "A polygon needs at least four points")
    polygon = Polygon(data.coordinates[0])
    if not polygon.is_valid:
        polygon = polygon.buffer(0)
    site = Site(
        project_id=project_id,
        name=data.name,
        area_hectares=data.area_hectares,
        carbon_stock=data.carbon_stock,
        biodiversity_score=data.biodiversity_score,
        tree_cover=data.tree_cover,
        geometry=from_shape(polygon, srid=4326),
    )
    db.add(site)
    db.commit()
    db.refresh(site)
    return site_output(site)

@app.get("/sites/{site_id}", response_model=SiteOut)
def get_site(site_id: int, db: Session = Depends(get_db), user=Depends(current_user)):
    site = (
        db.query(Site)
        .join(Project, Site.project_id == Project.id)
        .filter(Site.id == site_id, Project.owner_id == user.id)
        .first()
    )
    if not site:
        raise HTTPException(404, "Site not found")
    return site_output(site)
