"""
EduSmart Decision Platform
Backend API

Responsabilités :
- API REST
- Communication frontend
- Orchestration future ETL
- Accès aux données
"""


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


# Création application FastAPI

app = FastAPI(
    title="EduSmart Decision Platform API",
    description="""
    API centrale de la plateforme Data Engineering éducative.

    Sources :
    - PostgreSQL
    - MySQL
    - MongoDB
    - Redis
    - CSV / JSON

    Modules :
    - ETL
    - Dashboard
    - Analytics
    - Machine Learning
    """,
    version="1.0.0"
)



# ==============================
# Configuration CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ==============================
# Route principale
# ==============================

@app.get("/")
def home():

    return {
        "application": "EduSmart Decision Platform",
        "status": "running",
        "version": "1.0.0",
        "timestamp": datetime.now()
    }



# ==============================
# Health Check Docker
# ==============================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "backend-api"
    }



# ==============================
# Dashboard (future connexion ETL)
# ==============================

@app.get("/api/dashboard")
def dashboard():

    return {

        "students": 0,
        "courses": 0,
        "teachers": 0,
        "success_rate": 0,

        "message":
        "Dashboard data will come from Data Warehouse"

    }



# ==============================
# Sources disponibles
# ==============================

@app.get("/api/sources")
def sources():

    return {

        "databases": [

            {
                "name": "PostgreSQL",
                "usage": "Academic data"
            },

            {
                "name": "MySQL",
                "usage": "Learning platform"
            },

            {
                "name": "MongoDB",
                "usage": "Mobile logs"
            },

            {
                "name": "Redis",
                "usage": "Real time data"
            }

        ]

    }