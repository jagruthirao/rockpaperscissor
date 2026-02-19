from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base
import datetime

class UserInteraction(Base):
    __tablename__ = "user_interactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    
    liked = Column(Boolean, default=False) # True = Like/Swipe Right, False = Dislike/Swipe Left
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    # product = relationship("Product")
