from fastapi import APIRouter, File, UploadFile, Form
from app.services.ai_service import feature_extractor
from app.services.vto import vto_service
from app.services.color_analysis import color_service

router = APIRouter()

@router.post("/extract-features")
async def extract_features(file: UploadFile = File(...)):
    """
    Extracts visual features using VGG16 + PCA.
    """
    features = feature_extractor.extract_features(file.filename)
    return {"filename": file.filename, "features_dim": len(features), "features": features[:10]}

@router.post("/try-on")
async def virtual_try_on(user_image: UploadFile = File(...), garment_image: UploadFile = File(...)):
    """
    Performs virtual try-on using SMPL + Diffusion.
    """
    # In a real app, we'd save files and pass paths
    result = await vto_service.synthesize_try_on(user_image.filename, garment_image.filename)
    return result

@router.post("/color-analysis")
async def analyze_color(file: UploadFile = File(...)):
    """
    Determines user's seasonal color palette.
    """
    result = await color_service.analyze_user_color(file.filename)
    return result
