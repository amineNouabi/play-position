""" Root Router for api v1 """
from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/status")
async def status():
    """Check the status of the API"""
    return {"status": "ok"}
