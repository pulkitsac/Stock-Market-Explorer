import React, {useState, useEffect} from "react";

const Getprice = () => {
    const [symbol, setSymbol] = useState("");
    const [close, setClose] = useState("");
    const [timestamp, setTime] = useState("");
    const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {

    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }

    e.preventDefault();
    try {
      const queryString = objToQueryString({
        symbol: symbol,
        timestamp: timestamp,
    });
      let res = await fetch(`http://localhost:8000/api/closeprice/?${queryString}`, {
        method: "GET",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson);
        setMessage("Close Price found successfully");
        setClose(resJson.close);
        setSymbol(resJson.symbol);
        setTime(resJson.timestamp);
      } else {
        
        setMessage("Some error occured");

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          placeholder="Symbol"
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="text"
          value={timestamp}
          placeholder="Date"
          onChange={(e) => setTime(e.target.value)}
        />  
        <button type="submit">Get Close</button>

        <div className="message">{message ? <p>{message} {close}</p> : null }</div>
      </form>
    </div>
  );
}


export default Getprice