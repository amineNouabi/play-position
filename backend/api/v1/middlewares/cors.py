from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings


def add_cors_middleware(app: FastAPI):
    """Middleware to add cors origins to api"""
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin)
                           for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
