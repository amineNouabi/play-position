""" Core configuration settings. """

from os import environ
from dotenv import load_dotenv
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


load_dotenv()


class Settings(BaseSettings):
    """Core settings."""
    PP_PROJECT_NAME: str = "Play Position Backend"
    PP_API_V1_PREFIX: str = "/api/v1"
    PP_SUPABASE_URL: str = environ.get("PP_SUPABASE_URL")
    PP_SUPABASE_KEY: str = environ.get("PP_SUPABASE_KEY")
    PP_JWT_SECRET: str = environ.get("PP_JWT_SECRET")
    PP_PSQL_USER: str = environ.get("PP_PSQL_USER")
    PP_PSQL_PASSWORD: str = environ.get("PP_PSQL_PASSWORD")
    PP_PSQL_HOST: str = environ.get("PP_PSQL_HOST")
    PP_PSQL_PORT: str = environ.get("PP_PSQL_PORT")
    PP_PSQL_DB: str = environ.get("PP_PSQL_DB")
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = [
        "http://0.0.0.0", "http://0.0.0.0:5000"]
    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = 5000


settings = Settings()
