from distutils import extension
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from numpy import DataSource
from sqlalchemy.orm import Session
from datetime import date


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

path = os.getcwd();

# os.chdir('/Users/pulkitsachan/Desktop/Stock-Market-Explorer/')
extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
print (all_filenames)

tablename = models.closeprice.__tablename__

for i in range(len(all_filenames)):
    with open(all_filenames[i], 'r') as f:
        #result = chardet.detect(f.read())
        df = pd.read_csv(all_filenames[i],usecols = [0,5,10,12],header=0)
        #print(c)
        #Change data type of date from str to date format and use query to get result
        df.to_sql(tablename,con=engine,index=True,if_exists='append')
        query = sqlalchemy.update(models.closeprice).where(models.closeprice.DataSource==None).values(DataSource=all_filenames[i])
        connection.execute(query)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

#TODOS - SEE WHAT format crud uses in date type and use library to interpret useri


@app.get("/api/closeprice/", response_model=schemas.ClosePrice)
def get_close(symbol: str,timestamp: str, db: Session = Depends(get_db)):
    db_closeprice = crud.get_close_price_by_symbol_and_date(db,symbol=symbol,timestamp=timestamp)
    print (db_closeprice)
    if db_closeprice is None:
        raise HTTPException(status_code=404, detail="Close Price not found for the given date")
    return db_closeprice

@app.get("/api/closeprice/range/", response_model=List[schemas.ClosePrice])
def get_close_range(symbol: str,timestamp1: str,timestamp2: str,db: Session = Depends(get_db)):
    db_closeprice = crud.get_close_price_by_symbol_and_daterange(db,symbol=symbol,timestamp1=timestamp1,timestamp2=timestamp2)
    print (db_closeprice)
    if db_closeprice is None:
        raise HTTPException(status_code=404, detail="Close Price not found for the given date")
    return db_closeprice

@app.get("/api")
async def root():
    return { "message": "Stock Market Explorer"}