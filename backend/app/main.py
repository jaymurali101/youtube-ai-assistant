# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.generate_script import router as generate_router

app = FastAPI(title="Script Generator API")

# Optional: Enable CORS for frontend to access your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your route file
app.include_router(generate_router, prefix="/api", tags=["Script Generation"])
