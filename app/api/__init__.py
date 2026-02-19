from fastapi import APIRouter
from app.api import products, try_on, marketplace, wardrobe, auth, recommendation

router = APIRouter()

router.include_router(products.router, prefix="/products", tags=["products"])
router.include_router(try_on.router, prefix="/ai", tags=["ai"])
router.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
router.include_router(wardrobe.router, prefix="/wardrobe", tags=["wardrobe"])
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(recommendation.router, prefix="/recommendation", tags=["recommendation"])
