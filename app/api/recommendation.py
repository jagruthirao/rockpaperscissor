from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.db.session import get_db
from app.services.recommendation import recommendation_service
from app.models.user import User
# from app.api.auth import get_current_user

router = APIRouter()

class QuizRequest(BaseModel):
    gender: str
    budget: float
    occasion: str

class SwipeRequest(BaseModel):
    product_id: int
    liked: bool

@router.post("/quiz")
async def submit_quiz(request: QuizRequest, db: Session = Depends(get_db)):
    """
    Get recommendations based on quiz.
    """
    recs = await recommendation_service.get_recommendations(
        db, request.gender, request.budget, request.occasion
    )
    
    # Generate Style Tip based on occasion
    style_tips = {
        "Wedding": "Muted pastels are perfect for daytime ceremonies, while deep jewel tones work best for evening receptions.",
        "Party": "Vibrant patterns and structured fits are trending. Don't be afraid to experiment with textures like velvet or silk.",
        "Office": "Stick to breathable fabrics and neutral tones for a sharp, professional look that lasts all day.",
        "College": "Comfort meets style. Layering is key—try a graphic tee with an open shirt or jacket.",
        "Casual Outing": "Keep it relaxed but polished. A well-fitted pair of jeans and a clean sneaker never fail."
    }
    tip = style_tips.get(request.occasion, "Confidence is your best accessory. Wear what makes you feel great!")

    # Format response
    return {
        "recommendations": recs,
        "style_tip": tip,
        "message": f"Found {len(recs)} styles for your {request.occasion}"
    }

@router.post("/swipe")
async def swipe_product(request: SwipeRequest, db: Session = Depends(get_db)):
    """
    Record like/dislike. Partitioned by user_id=1 for single-user mode.
    """
    # Default to user_id=1 since login is removed
    return await recommendation_service.process_swipe(
        db, 1, request.product_id, request.liked
    )

@router.get("/{product_id}/accessories")
async def get_accessories(product_id: int, db: Session = Depends(get_db)):
    """
    Get matching accessories.
    """
    return await recommendation_service.get_accessories(db, product_id)

@router.get("/generate-outfit")
async def generate_outfit(gender: Optional[str] = "Female", occasion: Optional[str] = "Party"):
    """
    Stub for Nano Banana AI Picture Generation.
    Returns different images based on simple context rules.
    """
    # Female Images
    female_images = {
        "Wedding": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop",
        "Party": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000&auto=format&fit=crop",
        "Casual": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
        "Office": "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2000&auto=format&fit=crop",
        "Casual Outing": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
    }
    
    # Male Images
    male_images = {
        "Wedding": "https://images.unsplash.com/photo-1507081323647-4d250478b919?q=80&w=2000&auto=format&fit=crop", # Men's Suit/Ethnic
        "Party": "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2000&auto=format&fit=crop", # Men's Stylish Jacket
        "Casual": "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=2000&auto=format&fit=crop", # Men's Casual
        "Office": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop", # Men's Formal
        "Casual Outing": "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=2000&auto=format&fit=crop"
    }

    # Select Set
    image_set = male_images if gender == "Male" else female_images
    
    # Default fallback
    selected_image = image_set.get(occasion, image_set.get("Casual"))
    
    return {
        "image_url": selected_image,
        "description": f"AI Generated {occasion} Ensemble for {gender}."
    }

@router.get("/history")
async def get_user_history(db: Session = Depends(get_db)):
    """
    Get user's liked items (User 1).
    """
    # Join UserInteraction with Product
    from app.models.interaction import UserInteraction
    from app.models.product import Product
    
    interactions = db.query(UserInteraction, Product).join(Product, UserInteraction.product_id == Product.id).filter(
        UserInteraction.user_id == 1,
        UserInteraction.liked == True
    ).all()
    
    # Format response
    history = []
    for interaction, product in interactions:
        history.append({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image_url": product.image_url,
            "date": interaction.timestamp.strftime("%Y-%m-%d")
        })
        
    return history
