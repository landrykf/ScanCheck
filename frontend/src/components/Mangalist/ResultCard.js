import React from "react";
import { Favorite } from "./favorite/Favorite";

export const ResultCard = (props) => {
  if (props.character) {
    return <div></div>;
  } else {
    return (
      <div class="result-card">
        <div className="poster-wrapper">
          <a href={`/manga/${props.mangaId}`}>
            <img src={props.image} alt="pics" />
            <div className="info">
              <div className="header">
                <h5 className="title">{props.title}</h5>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
};
