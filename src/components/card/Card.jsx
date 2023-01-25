import React from "react";

const Card = ({ title, brand, thumbnail, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span className="card-brand">({brand})</span>
      </div>
      <div className="card-content">
        <img src={thumbnail} style={{ width: "100%", borderRadius: 8 }} />
      </div>
    </div>
  );
};

export default Card;
