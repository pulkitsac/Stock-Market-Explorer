# Stock-Market-Explorer

To run the app - 
1. Clone the project
2. Navigate to the project directory in the terminal
3. Execute the following commands - 
  3.1 rm stockmarket_app.db
  3.2 uvicorn sql_app.main:app
  
  This is will setup your database and web server.
  
4. In another terminal window go to the project directory and run the following command
  4.1 cd frontend
  4.2 npm start
  4.3 This will run the react app on your local machine.
  
  
5. To test the application simply type any symbol name (e.g.- "AARVI" )and date in the format of "16-SEP-2022" and simply click on Get Close Price.
