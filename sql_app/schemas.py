from datetime import date
from pydantic import BaseModel


class ClosePrice(BaseModel):
    symbol: str
    close: float
    timestamp: str
    isin: str

    class Config:
        orm_mode = True