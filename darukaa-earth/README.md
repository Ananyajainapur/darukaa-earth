# Darukaa.Earth

A simple full-stack dashboard for managing carbon and biodiversity projects and their geographical sites.

## Stack
- React + Vite
- Mapbox GL JS + Mapbox GL Draw
- Chart.js
- FastAPI
- PostgreSQL + PostGIS
- JWT authentication
- GitHub Actions
- Pre-commit

## Features
- User registration and login
- Create and view projects
- Add sites by drawing polygons on a Mapbox map
- View project sites on the map
- Site analytics with charts
- JWT protected APIs
- Basic automated lint/build checks

## Run locally

### 1. Database
Install Docker and run:

```bash
docker compose up -d db
```

The database uses PostgreSQL with PostGIS.

### 2. Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Backend runs at http://localhost:8000

### 3. Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs at http://localhost:5173

Put your Mapbox public token in `frontend/.env`:

```env
VITE_MAPBOX_TOKEN=your_mapbox_token
```

## API
- POST `/auth/register`
- POST `/auth/login`
- GET `/projects`
- POST `/projects`
- GET `/projects/{id}`
- POST `/projects/{id}/sites`
- GET `/projects/{id}/sites`
- GET `/sites/{id}`

## Database schema

`users`
- id
- name
- email
- password_hash

`projects`
- id
- name
- description
- created_at
- owner_id

`sites`
- id
- project_id
- name
- area_hectares
- carbon_stock
- biodiversity_score
- tree_cover
- geometry
- created_at

The `geometry` column is a PostGIS Polygon using SRID 4326.

## CI/CD
GitHub Actions runs backend syntax checks and frontend build checks on pushes and pull requests. The repository also contains a pre-commit configuration for basic formatting/linting.

For deployment, the frontend can be deployed to Vercel and the FastAPI backend/database can be deployed to Render or another PostgreSQL-compatible platform. Add production environment variables before deployment.

## Demo data
After registration, create a project and draw a polygon on the map. The site form saves simple analytics values that are then shown in the site dashboard.
