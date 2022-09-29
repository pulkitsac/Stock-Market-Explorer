from distutils import extension
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from numpy import DataSource
from sqlalchemy.orm import Session
from datetime import date

import datetime

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import csv
import pandas as pd


#df = pd.read_csv("/Users/pulkitsachan/Desktop/Stock-Market-Explorer/cm16Sep2022bhav.csv", usecols = ['SYMBOL','TIMESTAMP','CLOSE'])


#models.Base.metadata.create_all(bind=engine)
db = SessionLocal()


# with open("/Users/pulkitsachan/Desktop/Stock-Market-Explorer/cm16Sep2022bhav.csv", "r") as f:
#     csv_reader = csv.DictReader(f)

#     for row in csv_reader:
#         db_record = models.ClosePrice(
#             date=datetime.datetime.strptime(row["TIMESTAMP"], "%d-%b-%Y"),
#             symbol = row["SYMBOL"],
#             closePrice = float(row["CLOSE"]),
#         )
#         db.add(db_record)

#     db.commit()

# db.close()


#end of models

import pandas as pd
import sqlalchemy

connection = engine.connect()

import os
import glob
#import chardet

os.chdir('/Users/pulkitsachan/Desktop/Stock-Market-Explorer/')
extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
print (all_filenames)

tablename = models.closeprice.__tablename__

#print (tablename)
#change range to len all_filename
for i in range(1):
    with open(all_filenames[i], 'r') as f:
        #result = chardet.detect(f.read())
        df = pd.read_csv(all_filenames[i],usecols = [0,5,10,12],header=0)
        df.to_sql(tablename,con=engine,index=False,if_exists='append')
        query = sqlalchemy.update(models.closeprice).where(models.closeprice.DataSource==None).values(DataSource=all_filenames[i])
        connection.execute(query)


from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/api/closeprice/", response_model=schemas.ClosePrice)
def read_user(symbol: str,timestamp: str, db: Session = Depends(get_db)):
    db_closeprice = crud.get_close_price_by_symbol_and_date(db, symbol=symbol, timestamp=timestamp)
    if db_closeprice is None:
        raise HTTPException(status_code=404, detail="Close Price not found for the given date")
    return db_closeprice

@app.get("/api")
async def root():
    return { "message": "Stock Market Explorer"}