import React from "react";

export const CrewsCard = (props) => {
  return (
    <div className="crews-card">
      <div className="poster-wrapper">
        <img src={props.image} alt="pics" />

        <h5 className="title">{props.name}</h5> 
      </div>
    </div>
  );
};
