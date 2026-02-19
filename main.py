from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as api_router
from app.core import config
from app.db.session import engine, Base
from app.models import product, user # Import models to register them

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="StyleFusion API", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to StyleFusion API"}

# Include routers
# Include routers
app.include_router(api_router, prefix="/api/v1")

# Force include recommendation router (manual fix for import issue)
from app.api.recommendation import router as rec_router
app.include_router(rec_router, prefix="/api/v1/recommendation", tags=["recommendation"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
