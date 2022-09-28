from enum import unique
from time import time
from sqlalchemy import Column, Integer, PrimaryKeyConstraint, String,Float, UniqueConstraint
from sqlalchemy.types import Date
from .database import Base


class closeprice(Base):
    __tablename__ = "ClosePrice"

    symbol = Column(String, index=True, unique=False)
    close = Column(Float)
    timestamp = Column(String, index=True, unique=False)
    isin = Column(String,index=True, unique=False)
    PrimaryKeyConstraint(symbol,timestamp,isin)
    DataSource = Column(String)
