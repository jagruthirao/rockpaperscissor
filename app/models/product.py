from sqlalchemy import Column, Integer, String, Float, JSON
from app.db.session import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    price = Column(Float)
    image_url = Column(String, nullable=True)
    category = Column(String, index=True)
    brand = Column(String, index=True)
    
    # New fields for recommendation
    gender = Column(String, index=True) # "Male", "Female", "Unisex"
    occasion = Column(String, index=True) # "Wedding", "Casual", "Party", "Work"
    style_tags = Column(String, nullable=True) # Comma-separated tags e.g. "minimalist,boho"
