from fastapi import FastAPI

from app.database import Base, engine
from app.routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ProofOfWork API",
    version="1.0.0"
)

app.include_router(auth.router)


@app.get("/")
def root():
    return {
        "message": "ProofOfWork Backend Running 🚀"
    }