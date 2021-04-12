import React from "react";
import { FollowHander } from "../Profil/FollowHander";
import { Favorite } from "./favorite/Favorite";

export const UserCard = (props) => {
  return (
    // <div>
    //     <p>{props.username}</p>
    // </div>
    <div class="result-card">
      <div className="poster-wrapper">
        <div className="follow-handler">
          <FollowHander idToFollow={props.userId} type={"suggestion"} />
        </div>
        <a href={`/user/${props.userId}`}>
          <img src={props.image} alt="pics" />
          <div className="info">
            <div className="header">
              <h5 className="title">{props.username}</h5>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
