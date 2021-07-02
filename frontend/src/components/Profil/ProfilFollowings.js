import React from "react";
import { useSelector } from "react-redux";
import { FollowHander } from "./FollowHander";

export const ProfilFollowings = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="profil-body-followings">
      <h5> Abonnements : {userData?.following?.length}</h5>

      <ul>
        {usersData.map((user) => {
          for (let i = 0; i < userData.following.length; i++) {
            if (user._id === userData.following[i]) {
              return (
                <li key={user._id}>
                  <a href={`/user/${user._id}`}>
                    <img src={user.picture} alt="user-pic" />
                    <h4> {user.username}</h4>
                  </a>
                  <div className="follow-handler">
                    <FollowHander idToFollow={user._id} type={"suggestion"} />
                  </div>
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
};
