""" Version 1 of the API app """
from fastapi import FastAPI

from core.config import settings
from api.v1.middlewares.cors import add_cors_middleware

from api.v1.views.index import api_router
from api.v1.views.users import users_router

from core.events import lifespan


def create_app() -> FastAPI:
    """Creates the FastAPI app with all middlewares and routes"""
    app = FastAPI(
        lifespan=lifespan,
        title=settings.PP_PROJECT_NAME
    )
    add_cors_middleware(app)
    app.include_router(api_router, prefix=settings.PP_API_V1_PREFIX)
    app.include_router(users_router, prefix=settings.PP_API_V1_PREFIX)
    return app


app = create_app()


if __name__ == "__main__":
    """If this file got executed directly it Runs the server in debug mode"""
    import uvicorn
    uvicorn.run(app, host=settings.SERVER_HOST, port=settings.SERVER_PORT,
                log_level="debug", access_log=True)
