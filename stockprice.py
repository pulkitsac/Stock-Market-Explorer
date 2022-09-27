from datetime import date
from jugaad_data.nse import bhavcopy_save
import pandas as pd
from jugaad_data.holidays import holidays

date_range_2022 = pd.bdate_range(start='09/16/2022', end = '09/26/2022', 
                    freq='C', holidays = holidays(2022,9))

dates_2022 = [x.date() for x in date_range_2022]

#print (dates_2022)


import time

for dates in dates_2022:
     try:
          bhavcopy_save(dates, "./")
     except (ConnectionError) as e:
          time.sleep(10) #stop program for 10 seconds and try again.
          try:
               bhavcopy_save(dates, "./")
          except (ConnectionError) as e:
               print(f'{dates}: File not Found')

               



