from enum import unique
from time import time
from pandas import notna
from sqlalchemy import Column, Integer, PrimaryKeyConstraint, String,Float, UniqueConstraint
from sqlalchemy.types import Date
from .database import Base


class closeprice(Base):
    __tablename__ = "ClosePrice"

    index = Column(Integer)
    symbol = Column(String, index=True, unique=False)
    close = Column(Float)
    timestamp = Column(String, index=True, unique=False)
    isin = Column(String,index=True, unique=False)
    PrimaryKeyConstraint(index,symbol,timestamp)
    DataSource = Column(String)
