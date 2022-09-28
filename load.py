import csv
import datetime

from app import models
from app.database import SessionLocal, engine

db = SessionLocal()

models.Base.metadata.create_all(bind=engine)

with open("cm16Sep2022bhav.csv", "r") as f:
    csv_reader = csv.DictReader(f)

    for row in csv_reader:
        db_record = models.Record(
            date=datetime.datetime.strptime(row["TIMESTAMP"], "%d-%m-%Y"),
            symbol = row["SYMBOL"],
            closePrice = row["CLOSE"],
        )
        db.add(db_record)

    db.commit()

db.close()