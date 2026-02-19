from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.services.marketplace import marketplace_service

router = APIRouter()

@router.get("/search", response_model=List[Dict])
async def search_marketplace(query: str):
    """
    Search products across Amazon, Myntra, and internal catalog.
    """
    try:
        results = await marketplace_service.aggregate_search(query)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/amazon/{query}")
async def search_amazon(query: str):
    return await marketplace_service.search_amazon(query)

@router.get("/myntra/{category}")
async def search_myntra(category: str):
    return await marketplace_service.fetch_myntra_catalog(category)

@router.post("/sync")
async def sync_inventory():
    """
    Trigger inventory sync from external sources.
    """
    # Stub: Fetch from Amazon/Myntra and sync to local DB
    # In real app, this would be a background task
    amazon_items = await marketplace_service.search_amazon("luxury")
    # sync_result = await inventory_sync.sync_catalog(db, amazon_items)
    return {"status": "Sync started", "items_processed": len(amazon_items)}
