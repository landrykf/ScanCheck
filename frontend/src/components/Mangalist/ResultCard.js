import React from "react";
import { useSelector } from "react-redux";
import { Favorite } from "./favorite/Favorite";

export const ResultCard = (props) => {
  const usersData = useSelector((state) => state.usersReducer);

  console.log(props);
  if (props.character) {
    return <div></div>;
  } else {
    return (
      <div class="result-card">
        <div className="poster-wrapper">
        <Favorite
              userFrom={usersData._id}
              mangaId={props.mangaId}
              mangaTitle={props.title}
              mangaImage={props.image}
            />
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
