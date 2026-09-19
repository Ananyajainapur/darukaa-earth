from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional

class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class ProjectIn(BaseModel):
    name: str
    description: Optional[str] = ""

class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: str

class SiteIn(BaseModel):
    name: str
    area_hectares: float = 0
    carbon_stock: float = 0
    biodiversity_score: float = 0
    tree_cover: float = 0
    coordinates: list[list[list[float]]]

class SiteOut(BaseModel):
    id: int
    project_id: int
    name: str
    area_hectares: float
    carbon_stock: float
    biodiversity_score: float
    tree_cover: float
    geometry: dict
