import React, {useState ,useEffect} from "react"

import Getprice from "./components/Closeprice";
import Getpricerange from "./components/Closepricerange";

const App = () => {
  const [message, setmessage] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isShownRange, setIsShownRange] = useState(false);

  const handleClickForRange = event => {
    // 👇️ toggle shown state
    setIsShownRange(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const getWelcomeMessage = async() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:8000/api", requestOptions);
    const data = await response.json();

    if(!response.ok){
      console.log("something messed up")
    }
    else
      setmessage(data.message);
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleClickForRange}>Closing Price for Date Range</button>
            {/* 👇️ show component on click */}
      <button onClick={handleClick}>Closing Price for a date</button>
      {isShown && <Getprice />}
      <br></br>
      {isShownRange && <Getpricerange />}
    </div>
  );
};

export default App;
