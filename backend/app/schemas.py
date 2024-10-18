from pydantic import BaseModel, EmailStr
from datetime import datetime 
from typing import Optional

class CreateUser(BaseModel):
  email: EmailStr
  password: str
  risk_percentage: Optional[int] = 0
  risk_dollar: Optional[int] = 0
  

class UserResponse(BaseModel):
  id: int
  email: EmailStr
  created_at: datetime
  risk_percentage: Optional[int] = 0
  risk_dollar: Optional[int] = 0
  
  class Config:
      orm_mode = True
  
class Order(BaseModel):
  symbol: str
  entry_price: Optional[int] = 0
  stop_loss_price: Optional[int] = 0
  take_profit: Optional[int] = 0
  

class CreateOrder(Order):
  pass
  
class OrderResponse(Order):
  id: int
  user: UserResponse
  pass

  class Config:
      orm_mode = True

class UserCredentials(BaseModel):
  email: EmailStr
  password: str
  
class TokenData(BaseModel):
  id: Optional[str] = None
  
class RiskSettingsData(BaseModel):
  risk_percentage: Optional[int] = 0
  risk_dollar: Optional[int] = 0