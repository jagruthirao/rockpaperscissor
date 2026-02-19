from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base
import datetime

class UserHistory(Base):
    __tablename__ = "user_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    action = Column(String) # "view", "try_on", "purchase"
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships (optional, stub for now as we might not fetch full objects always)
    # product = relationship("Product")
