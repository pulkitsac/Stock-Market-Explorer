import React, {useState ,useEffect} from "react"

import Getprice from "./components/Closeprice";

const App = () => {
  const [message, setmessage] = useState("");

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
      <Getprice/>
    </div>
  );
};

export default App;