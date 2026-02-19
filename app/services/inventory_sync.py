from app.models.product import Product
from sqlalchemy.orm import Session
import datetime

class InventorySyncService:
    def __init__(self):
        pass

    def normalize_product_data(self, external_data: dict) -> dict:
        """
        Standardizes price fields, timestamps, and stock availability.
        """
        # Logic to map Amazon/Myntra fields to our Product model
        return {
            "name": external_data.get("name"),
            "price": float(external_data.get("price", 0)),
            "image_url": external_data.get("image"),
            "category": external_data.get("category", "General"),
            "brand": external_data.get("source", "Unknown"),
            # "last_updated": datetime.datetime.utcnow() 
        }

    async def sync_catalog(self, db: Session, external_items: list):
        """
        Updates local DB with external items.
        """
        count = 0
        for item in external_items:
            normalized = self.normalize_product_data(item)
            # Check if exists, update or create
            # This is a simplification
            db_product = Product(**normalized)
            db.add(db_product)
            count += 1
        
        db.commit()
        return {"status": "success", "synced_count": count}

inventory_sync = InventorySyncService()
