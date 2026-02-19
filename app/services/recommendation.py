from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.interaction import UserInteraction
import random

class RecommendationService:
    async def get_recommendations(self, db: Session, gender: str, budget: float, occasion: str):
        """
        Get recommendations based on quiz criteria with specific brand logic.
        """
    async def get_recommendations(self, db: Session, gender: str, budget: float, occasion: str):
        """
        Get recommendations based on quiz criteria with specific brand logic.
        """
        # Define occasion-based keywords for search/generation simulation
        occasion_map = {
            "Wedding": ["Ethnic", "Sherwani", "Lehenga", "Kurta"],
            "Party": ["Blazer", "Jacket", "Party Wear", "Slim Fit"],
            "Office": ["Formal", "Shirt", "Trousers", "Office Wear"],
            "College": ["Casual", "T-Shirt", "Jeans", "Sneakers"],
            "Casual Outing": ["Casual", "Comfort", "Streetwear"]
        }
        
        keywords = occasion_map.get(occasion, ["Fashion"])
        
        # Strictly filter by gender first
        query = db.query(Product).filter(Product.gender == gender)
        
        # Then filter by occasion if provided
        if occasion:
            query = query.filter(Product.occasion == occasion)
        
        # Budget logic - STRICT adherence
        if budget >= 50000:
             # High Budget: Show premium items
             query = query.filter(Product.price >= 5000)
        elif budget >= 2000:
             # Mid Range (2000-5000)
             query = query.filter(Product.price <= budget).filter(Product.price >= 1500)
        else:
             # Economy (< 2000)
             query = query.filter(Product.price <= budget)

        recommendations = query.limit(5).all()
        
        # Fallback if DB empty: Generate Strict Dynamic Mocks for "Complete Look"
        if not recommendations:
            # 1. Determine base style stats
            is_male = gender == "Male"
            # Fix target price logic: Use full budget if < 50k, else set high base
            target_price = budget if budget < 50000 else 150000
            
            # ... (rest of the outfits/shoes/accessories dicts - kept same, just updating logic block)
            
            # 2. Define category-specific items based on Occasion
            outfits = {
                "Wedding":  ("Sherwani Set" if is_male else "Lehenga Choli", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop"),
                "Party":    ("Velvet Blazer" if is_male else "Sequin Party Dress", "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000&auto=format&fit=crop"),
                "Office":   ("Slim Fit Shirt & Trousers" if is_male else "Formal Blazer Suit", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000&auto=format&fit=crop"),
                "Casual":   ("Printed Oversized Tee" if is_male else "Boho Maxi Dress", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"),
                "College":  ("Denim Jacket & Chinos" if is_male else "Casual Kurti & Jeans", "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=2000&auto=format&fit=crop"),
            }
            
            shoes = {
                "Wedding": ("Mojaris" if is_male else "Embroidered Heels", "https://images.unsplash.com/photo-1560769625-2556ac3e1fa9?q=80&w=2000&auto=format&fit=crop"),
                "Party":   ("Leather Loafers" if is_male else "Stilettos", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop"),
                "Office":  ("Oxfords" if is_male else "Block Heels", "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=2000&auto=format&fit=crop"),
                "Casual":  ("Air Sneakers" if is_male else "White Sneakers", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop"),
            }
            
            accessories = {
                "Wedding": ("Turban/Stole" if is_male else "Kundan Jewellery Set", "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop"),
                "Party":   ("Designer Watch" if is_male else "Clutch Bag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2000&auto=format&fit=crop"),
                "Casual":  ("Smart Watch" if is_male else "Tote Bag", "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2000&auto=format&fit=crop"),
            }

            # Select items (Default to Casual if key missing)
            outfit_name, outfit_img = outfits.get(occasion, outfits["Casual"])
            shoe_name, shoe_img = shoes.get(occasion, shoes["Casual"])
            acc_name, acc_img = accessories.get(occasion, accessories["Casual"])

            # Brand logic
            brand = "Rare Rabbit" if budget > 2000 else "Roadster"
            if not is_male: brand = "Manish Malhotra" if budget >= 50000 else ("Forever New" if budget > 2000 else "Tokyo Talkies")

            recommendations = [
                Product(
                    id=random.randint(100, 200), name=outfit_name, price=int(target_price * 0.6), 
                    brand=brand, image_url=outfit_img, category="Apparel", gender=gender, occasion=occasion
                ),
                Product(
                    id=random.randint(201, 300), name=shoe_name, price=int(target_price * 0.25), 
                    brand="Clarks" if budget > 2000 else "HRX", image_url=shoe_img, category="Footwear", gender=gender, occasion=occasion
                ),
                Product(
                    id=random.randint(301, 400), name=acc_name, price=int(target_price * 0.15), 
                    brand="Fossil" if budget > 2000 else "Fastrack", image_url=acc_img, category="Accessory", gender=gender, occasion=occasion
                )
            ]

        return recommendations

    async def get_accessories(self, db: Session, product_id: int):
        """
        Get accessories for a product.
        """
        # For now, just return random accessories
        # In a real app, we would use a more sophisticated recommendation engine
        accessories = db.query(Product).filter(Product.category == "Accessories").limit(3).all()
        return accessories

    async def process_swipe(self, db: Session, user_id: int, product_id: int, liked: bool):
        """
        Process a swipe interaction.
        """
        interaction = UserInteraction(user_id=user_id, product_id=product_id, liked=liked)
        db.add(interaction)
        db.commit()
        
        if not liked:
            # If disliked, we could return a new recommendation here
            pass
            
        return {"status": "success"}

recommendation_service = RecommendationService()
