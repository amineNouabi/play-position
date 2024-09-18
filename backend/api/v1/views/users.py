from fastapi import APIRouter, HTTPException

from core.deps import CurrentUser, SessionDep

from schemas.profile import ProfileUpdate

users_router = APIRouter()


@users_router.get("/profile")
async def get_profile(session: SessionDep, user: CurrentUser):
    print(user)
    data, count = await session.from_("profiles").select("*").eq("id", user.id).execute()
    _, got = data
    if not got or not len(got):
        raise HTTPException(status_code=404, detail="Profile not found")
    return got[0]


@users_router.put("/profile")
async def update_profile(session: SessionDep, user: CurrentUser, data: ProfileUpdate):
    print(data)
    data, count = await session.from_("profiles").update(data).eq("id", str(user.id)).execute()
    return data
