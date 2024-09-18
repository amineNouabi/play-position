from pydantic import BaseModel


class Profile(BaseModel):
    id: str
    full_name: str
    email: str
    avatar: str


class ProfileUpdate(BaseModel):
    full_name: str
    avatar: str
