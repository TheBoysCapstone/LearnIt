import React from "react";


const Card = ({ handler, color, title, description }) => {
  
  return (
    <>
      <div className={`card ${color}`} onClick={()=>handler(title)}>
        <h3>
          <strong>{title}</strong>
        </h3>
        <p>
          <small>{description}</small>
        </p>
      </div>
    </>
  );
};

export default Card;
