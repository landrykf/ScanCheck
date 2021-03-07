import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FollowHander } from "../Profil/FollowHander";
import { isEmpty } from "../Utils";
import { FavButton } from "./FavButton";
import {CardComments} from "./CardComments"


export const Card = ({ manga }) => {
  const [isLoading, SetIsLoading] = useState(true);
  const [isUpdated, SetIsUpdated] = useState(false);
  const [showComments, SetShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && SetIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    // console.log(manga.posterId);
                    if (user._id === manga.posterId) return user.picture;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <h3>
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                    //   console.log(manga.posterId);
                      if (user._id === manga.posterId) return user.username;
                    })
                    .join("")}
              </h3>
              {manga.posterId !== userData._id && (
                <>
                  <FollowHander idToFollow={manga.posterId} type={"card"} />
                </>
              )}
              <h3>{manga.title}</h3>
              <p>{manga.description}</p>
              {/* <p>{console.log(manga.comments.length)}</p> */}
            </div>
            <div className="card-footer">
              <div className="comment-icon">
                <img onClick={() => SetShowComments(!showComments)} src="../icons/message1.svg" alt="comment" />
                <span>{manga.comments.length}</span>
              </div>
              <FavButton manga={manga} />
            </div>
            {showComments && <CardComments manga={manga}/>}
          </div>
        </>
      )}
    </li>
  );
};
