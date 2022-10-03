from sqlalchemy.orm import Session
from datetime import date

from . import models, schemas

def get_close_price_by_symbol_and_date(db: Session, symbol: str, timestamp: str):
    return db.query(models.closeprice).filter(models.closeprice.symbol == symbol,models.closeprice.timestamp == timestamp).first()


