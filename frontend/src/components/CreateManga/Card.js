import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

export const Card = ({ manga }) => {
  const [isLoading, SetIsLoading] = useState(true);

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
                    console.log(manga.posterId);
                    if (user._id === manga.posterId) return user.picture;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div class="card-right">
            <div class="card-header">
              <h3>
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      console.log(manga.posterId);
                      if (user._id === manga.posterId) return user.username;
                    })
                    .join("")}
              </h3>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
