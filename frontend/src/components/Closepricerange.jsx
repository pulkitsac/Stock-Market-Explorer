import React, {useState, useEffect} from "react";

const Getpricerange = () => {
    const [symbol, setSymbol] = useState("");
    const [close, setClose] = useState("");
    const [timestamp1, setTime] = useState("");
    const [timestamp2, setTimestamp2] = useState("");
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState([]);

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
        timestamp1: timestamp1,
        timestamp2: timestamp2
    });
      let res = await fetch(`http://localhost:8000/api/closeprice/range/?${queryString}`, {
        method: "GET",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log(resJson);
        setMessage("Close Price found successfully");
        setClose(resJson.close);
        setSymbol(resJson.symbol);
        setTime(resJson.timestamp);
        setProducts(resJson);
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
          value={timestamp1}
          placeholder="From Date"
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          value={timestamp2}
          placeholder="To Date"
          onChange={(e) => setTimestamp2(e.target.value)}
        />        
        <button type="submit">Get Close</button>

        <div className="message">{message ? <p>{message} {close}</p> : null }</div>
        <div >{products.map((product) => (
        <p key={product.timestamp}>{product.timestamp}   {product.close}</p>))}</div>
      </form>
    </div>
  );
}


export default Getpricerange