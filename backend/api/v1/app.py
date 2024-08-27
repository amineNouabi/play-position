""" Version 1 of the API app """

import uvicorn
from fastapi import FastAPI

from api.v1.views.index import root_router

app = FastAPI()

app.include_router(root_router)

if __name__ == "__main__":
    """If File got executed directly Run the server in debug mode"""
    uvicorn.run(app, host="0.0.0.0", port=5000,
                log_level="debug", access_log=True)
