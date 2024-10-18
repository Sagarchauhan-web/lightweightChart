from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from ..database import get_db
from ..schemas import CreateOrder, OrderResponse
from .. import models
from ..oauth import get_current_user
from .. import database
from typing import List
from yahoo_fin.stock_info import get_data
import pandas as pd
import json

router = APIRouter(
  prefix="/order",
  tags=['order']
)

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[OrderResponse])
def get_orders(db: Session = Depends(database.get_db),
                         current_user: models.User = Depends(get_current_user)):
  
  orders = db.query(models.Order).options(joinedload(models.Order.user)).filter(models.Order.user_id == current_user.id).all()
  
  return orders

@router.post('/', status_code=status.HTTP_200_OK, response_model=OrderResponse)
def create_order(order_data: CreateOrder, db: Session = Depends(database.get_db),
                         current_user: models.User = Depends(get_current_user)):
  
  order = models.Order(user_id=current_user.id, **order_data.dict())
  db.add(order)
  db.commit()
  db.refresh(order)
  
  return order

@router.get('/testing', status_code=status.HTTP_200_OK)
def get_tiker_data(db: Session = Depends(database.get_db)):
  amazon_weekly= get_data("amzn", start_date="12/04/2009", end_date="12/04/2019", index_as_date = True, interval="1wk")
  print(type(amazon_weekly))
  # amazon = pd.DataFrame(amazon_weekly)
  # data = amazon_weekly.to_json(orient='records', lines=False)
  # result = data.to_dict("records")
  # json_data = amazon_weekly.to_json(orient='records', lines=False)

  json_data = amazon_weekly.to_json(orient='records', lines=False)
  parsed_json = json.loads(json_data)
  pretty_json = json.dumps(parsed_json, indent=4)
  print(pretty_json, type(pretty_json))
  return {
    "data": pretty_json}
