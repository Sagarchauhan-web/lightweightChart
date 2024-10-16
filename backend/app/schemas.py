from pydantic import BaseModel, EmailStr
from datetime import datetime 
from typing import Optional

class CreateUser(BaseModel):
  email: EmailStr
  password: str
  risk_percentage: Optional[int] = 0
  risk_dollar: Optional[int] = 0
  entry_price: Optional[int] = 0
  stop_loss_price: Optional[int] = 0
  take_profit: Optional[int] = 0
  created_at: Optional[datetime] = datetime.now()

class ReturnUser(BaseModel):
  id: int
  email: EmailStr
  created_at: Optional[datetime] = datetime.now()
  risk_percentage: Optional[int] = 0
  risk_dollar: Optional[int] = 0
  entry_price: Optional[int] = 0
  stop_loss_price: Optional[int] = 0
  take_profit: Optional[int] = 0