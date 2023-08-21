import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import Loader from "./components/Loader"
import "./styles/App.css"


function App() {  

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAllCoins = async () => {
      try {
        const {data} = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=100")
        // const {data} = await axios.get("https://api.coingecko.com/api/v3/coins/list")

        console.log(data);
        setLoading(false);
        setCoins(data);
      } catch (error) {
        alert("Not working")
      }
    }

    fetchAllCoins();

  }, []);


  return (
    <div className="home">
      {
        loading ? (<Loader />) : ( coins.map((item) => {
          return (
            <div>
            <Coin name={item.name} symbol={item.symbol} imgSrc={item.image} price={item.current_price} key={item.id} />
            </div>
          )
        }) )
      }
    </div>
  );
}

export default App;
