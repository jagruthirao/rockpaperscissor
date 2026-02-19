from sqlalchemy import Column, Integer, String
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    preferences = Column(String, nullable=True) # JSON string for now
    quiz_preferences = Column(String, nullable=True) # JSON: {"gender": "Female", "budget": 50000, "occasion": "Wedding"}
