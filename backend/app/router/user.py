from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CreateUser, UserResponse, UserCredentials, RiskSettingsData
from ..utils import hash, verify
from .. import models
from ..oauth import create_access_token, get_current_user
from .. import database

router = APIRouter(
  prefix="/users",
  tags=['User']
)

@router.get('/me', status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_users(db: Session = Depends(database.get_db), 
              current_user: models.User = Depends(get_current_user)):
  user = db.query(models.User).filter(models.User.id == current_user.id).first()
  
  return user

@router.post('/', status_code=status.HTTP_201_CREATED)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
  try:
    user_query = db.query(models.User).filter(models.User.email == user.email).first()
    print(user_query)
    if user_query != None:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    
    hashed_password = hash(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    del new_user.password
  except Exception as e:
    return {'error': True, 'message': e.detail}
    
  return {"data": new_user}

@router.get('/{id}', status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
  user = db.query(models.User).filter(models.User.id == id).first()
  
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  
  return user

@router.post("/login", status_code=status.HTTP_200_OK)
def login(user_credentials: UserCredentials, db: Session = Depends(database.get_db)):
  user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
  
  if not user:
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")
  
  if not verify(user_credentials.password, user.password):
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")
    
  access_token = create_access_token(data={"user_id": user.id})
  return {"access_token": access_token}

@router.post('/changeRiskSettings', status_code=status.HTTP_200_OK)
def change_risk_settings(setting_data: RiskSettingsData, db: Session = Depends(database.get_db),
                         current_user: models.User = Depends(get_current_user)):
  
  user = db.query(models.User).filter(models.User.id == current_user.id).first()

  if setting_data.risk_percentage:
    user.risk_percentage = setting_data.risk_percentage
    user.risk_dollar = 0
    
  if setting_data.risk_dollar:
    user.risk_dollar = setting_data.risk_dollar
    user.risk_percentage = 0

  db.commit()
  db.refresh(user)

  del user.password
  
  return {"data": user}

