import React from "react";
import { useSelector } from "react-redux";
import { FollowHander } from "./FollowHander";

export const ProfilFollowers = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="profil-body-followings">
      <h5>Abonnés : {userData?.followers?.length}</h5>

      <ul>
        {usersData.map((user) => {
          for (let i = 0; i < userData.followers.length; i++) {
            if (user._id === userData.followers[i]) {
              return (
                <li key={user.id}>
                  <img src={user.picture} alt="user-pic" />
                  <h4> {user.username}</h4>
                  <div class="follow-handler">
                    <FollowHander idToFollow={user._id} />
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
