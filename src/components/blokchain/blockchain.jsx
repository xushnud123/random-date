import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './blockchain.scss'


const Blockchain = () => {
    const [value,setValue] = useState([])

    useEffect(()=>{
        axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        ).then(res => {
            setValue(res.data)
            // console.log(res.data)
        }).catch(error => console.error(error))
    },[])
    return (
      <React.Fragment>
        {value.map((item) => (
          <div className="blockChain" key={item.id}>
            <img src={item.image} alt="" />
            <h1>{item.name}</h1>
            <p>{item.symbol}</p>
            <h2>${item.market_cap}</h2>
            <h2>${item.current_price}</h2>
          </div>
        ))}
      </React.Fragment>
    );
}
 
export default Blockchain;