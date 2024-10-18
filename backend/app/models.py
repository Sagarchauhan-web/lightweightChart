from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, text, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
  __tablename__ = "users"
  
  id = Column(Integer, primary_key=True, nullable=False)
  email = Column(String, unique=True, nullable=False)
  password = Column(String, nullable=False)
  risk_percentage = Column(Integer, nullable=False, server_default=text('0'))
  risk_dollar = Column(Integer, nullable=False, server_default=text('0'))
  created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
  
class Order(Base):
  __tablename__ = "orders"
  
  id = Column(Integer, primary_key=True, nullable=False)
  symbol = Column(String, nullable=False)
  entry_price = Column(Integer, nullable=False, server_default=text('0'))
  stop_loss_price= Column(Integer, nullable=False, server_default=text('0'))
  take_profit = Column(Integer, nullable=False, server_default=text('0'))
  user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  user = relationship("User")