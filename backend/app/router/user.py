from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CreateUser, ReturnUser
from ..utils import hash
from .. import models

router = APIRouter(
  prefix="/users",
  tags=['User']
)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=ReturnUser)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
  try:
    hashed_password = hash(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
  except Exception as e:
    print(e)
    
  return {"data": new_user}

@router.get('/{id}', response_model=ReturnUser)
def get_user(id: int, db: Session = Depends(get_db)):
  user = db.query(models.User).filter(models.User.id == id).first()
  
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  
  return {"data": user}
