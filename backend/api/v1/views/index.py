from fastapi import APIRouter

root_router = APIRouter()


@root_router.get("/status")
def status():
    """Check the status of the API"""
    return {"status": "ok"}
