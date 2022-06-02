import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";

const Card = ({ item, index, data, setData }) => {
  const [like, setLike] = useState(false);
  const handleEdit = (id) => {
    setLike(!like);
    const item = data.findIndex((i) => i.id === id);
    const to = data;
    to[item].like = !like;
    setData(to);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [like,data,setData]);

  return (
    <li key={item}>
      <span className="inform">
       {index >= 0 && <span className="inform-num"> {index + 1}</span>}
        {item.data}
      </span>
      <span className="actions">
        <span onClick={() => handleEdit(item.id)}>
          {like || item.like ? <FcLike /> : <IoMdHeartEmpty />}
        </span>
        <RiDeleteBin6Line />
      </span>
    </li>
  );
};

export default Card;
