from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.wardrobe import wardrobe_service
from app.services.sustainability import sustainability_service

router = APIRouter()

@router.post("/items")
async def add_item_to_closet(file: UploadFile = File(...)):
    """
    Uploads item to digital closet with auto-tagging.
    """
    return await wardrobe_service.add_item(file.filename)

@router.get("/items/{item_id}/cpw")
async def get_cost_per_wear(item_id: str, price: float, wears: int):
    """
    Calculate Cost Per Wear.
    """
    cpw = await wardrobe_service.calculate_cost_per_wear(item_id, price, wears)
    return {"item_id": item_id, "cost_per_wear": cpw}

@router.post("/sustainability/score")
async def get_sustainability_score(item_data: dict):
    """
    Get sustainability score for an item.
    """
    return await sustainability_service.calculate_footprint(item_data)
