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



// const Getprice = () => {
//     const [symbol, setSymbol] = useState("");
//     const [close, setClose] = useState("");
//     const [timestamp, setTime] = useState("");
//     const [isin, setIsin] = useState("");
//     const [active, setActive] = useState("False");



//     const handleSubmit = (e) => {
//         console.log("Submit handled");
//         e.preventDefault();
        
//         const requestOptions = {
//             method: "GET",
//             headers: { "Content-Type": "application/json"},
//             body: JSON.stringify({symbol: symbol, timestamp: timestamp}),
//         }

//         const response = fetch("http://localhost:8000/api/closeprice/", requestOptions);
//         const data = response.json();
//         console.log("API Called");

//         if(!response.ok) {
//             console.log("Invalid info")
//         }
//         else{
//             setSymbol(data.symbol);
//             setTime(data.timestamp);
//             setClose(data.close);
//             setIsin(data.isin);
//             setActive("True");
//         }
//     };

//     return (

//     <div className="column">
//       <form className="box" onSubmit={handleSubmit}>
//         <h1 className="title has-text-centered">Get Close Price</h1>
//         <div className="field">
//           <label className="label">Symbol</label>
//           <div className="control">
//             <input
//               type="text"
//               placeholder="Enter symbol"
//               value={symbol}
//               onChange={(e) => setSymbol(e.target.value)}
//               className="input"
//               required
//             />
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Timestamp</label>
//           <div className="control">
//             <input
//               type="text"
//               placeholder="Enter date"
//               value={timestamp}
//               onChange={(e) => setTime(e.target.value)}
//               className="input"
//               required
//             />
//           </div>
//         </div>
//         <br />
//         <button className="button is-primary" type="submit">
//           Get Close Price
//         </button>
//         <div className="message">{close ? <p>{close}</p> : null}</div>
//       </form>
//     </div>
  


//     );

// };

export default Getprice