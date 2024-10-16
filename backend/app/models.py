from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, text, ForeignKey

class User(Base):
  __tablename__ = "users"
  
  id = Column(Integer, primary_key=True, index=True, nullable=False)
  email = Column(String, unique=True, index=True, nullable=False)
  password = Column(String, nullable=False)
  risk_percentage = Column(Integer, nullable=False, server_default=text('0'))
  risk_dollar = Column(Integer, nullable=False, server_default=text('0'))
  entry_price = Column(Integer, nullable=False, server_default=text('0'))
  stop_loss_price= Column(Integer, nullable=False, server_default=text('0'))
  take_profit = Column(Integer, nullable=False, server_default=text('0'))
  created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))