import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./random-date.scss";
import Blockchain from "../blokchain/blockchain";
import Card from "./card";

const RandomDate = () => {
  const [value, setValue] = useState("");
  const [month, setMonth] = useState({ month: "", day: "" });
  const [error, setError] = useState(true);
  const [count, setCount] = useState(1);
  const [like,setLike] = useState([])
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem("data");
    return localData ? JSON.parse(localData) : "";
  });
  const [load, setLoad] = useState(false);
  const [effect, setEffect] = useState(false);
  const maxLength = data.length;

  const handleSubmit = (e) => {
    setCount(4);
    e.preventDefault();
    if (value !== "") {
      setEffect(!effect);
      const month = value.slice(5, 7);
      const day = value.slice(8, 10);
      setValue("");
      setMonth({ month, day });
    } else {
      return notify();
    }
  };
  const handleRandom = () => {
    setCount(2);
    setEffect(!effect);
    const month = Math.floor(Math.random() * 10) + 1;
    const day = Math.floor(Math.random() * 30) + 1;
    setValue("");
    setMonth({ month, day });
  };


  const handleLike = () => {
    setEffect(!effect)
    setCount(3)
    const l = data.filter(item => item.like === true)
    setLike(l)
  }

  const handleCard = (n) => {
    switch(n){
      case 1: 
      return data.map((item, index) => {
                      return (
                        <Card
                          item={item}
                          index={index}
                          data={data}
                          setData={setData}
                          key={item.id}
                        />
                      );
                    })
      case 2: 
      return <Card
                    item={data[maxLength - 1]}
                          
                          data={data}
                          setData={setData}
                        />
      case 3: return like.map((item, index) => {
        return (
          <Card
            item={item}
            index={index}
            data={data}
            setData={setData}
            key={item.id}
          />
        );
      });
      case 4: return <Card item={data[maxLength - 1]} data={data} setData={setData} />;
      default: return  null
    }
  }

  const notify = () => toast.error("Iltimos maydonni to`ldiring");
  const suc = () => toast.success("Muvaffaqiyatli qo'shildi");
  const toastError = () => toast.error("Request failed with status code 404");

  const activeAPI = `http://numbersapi.com/${month.month}/${month.day}`;
  useEffect(() => {
    setLoad(true);
    const res = async () => {
      await axios
        .get(activeAPI)
        .then((res) => {
          setLoad(false);
          setMonth({ month: "", day: "" });
          setData([
            ...data,
            { data: res.data, like: false, id: Math.random() * 1000 },
          ]);
          suc();
        })
        .catch((err) => {
          month.month && toastError();
          // setError(false)
          setLoad(false);
        });
    };
    res();
    localStorage.setItem("data", JSON.stringify(data));
  }, [data, effect]);

  const todatDate = new Date().toLocaleDateString("en-ca");

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      <div className="wrapper">
        <div className="row">
          <div className="formControl">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="date"
                value={value}
                max={todatDate}
                onChange={(e) => setValue(e.target.value)}
                className="inputDate"
                placeholder="date"
              />
              <button className="submit">Search</button>
            </form>
            <button className="random-btn" onClick={handleRandom}>
              Random
            </button>
            <button className="random-btn" onClick={() => handleLike()}>
              Like
            </button>
            <button className="random-btn" onClick={() => setCount(1)}>
             History
            </button>
          </div>
          {error ? (
            <React.Fragment>
              {load ? (
                <div className="loading">
                  <div className="lds-dual-ring" />
                </div>
              ) : (
                <ul className="inform-wrap">
                  {data ? (
                    handleCard(count)
                  ) : (
                    <ol key="1">Hech qanday malumot qidirilmadi?</ol>
                  )}
                </ul>
              )}
            </React.Fragment>
          ) : (
            <div className="error">
              <h1>Request failed with status code 404</h1>
            </div>
          )}
        </div>
        <Blockchain />
      </div>
    </React.Fragment>
  );
};

export default RandomDate;
