import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MyFavorite } from "../Mangalist/favorite/MyFavorite";
import { FollowHander } from "../Profil/FollowHander";
import { ProfilBody } from "../Profil/ProfilBody";
import { ProfilFollowers } from "../Profil/ProfilFollowers";
import { ProfilFollowings } from "../Profil/ProfilFollowings";
import { UserFavorite } from "./UserFavorite";

export const UserProfil = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [followersModal, setFollowersModal] = useState(props.followers);
  const [followingsModal, setFollowingsModal] = useState(props.followings);
  const [bodyModal, setBodyModal] = useState(props.bodyModal);

  let handleModal = (event) => {
    if (event.target.id === "followings") {
      setFollowersModal(false);
      setBodyModal(false);
      setFollowingsModal(true);
    } else if (event.target.id === "followers") {
      setFollowingsModal(false);
      setBodyModal(false);
      setFollowersModal(true);
    } else if (event.target.id === "show") {
      setFollowingsModal(false);
      setBodyModal(true);
      setFollowersModal(false);
    }
  };
  return (
    <div className="profil-head-container">
      <div className="bannere">{/* <h2> {userData.username}</h2> */}</div>
      <div className="profil-nav">
        <div className="banner">
          <img src={"." + props.user.banner} alt="banner pic" />
        </div>
        <div className="avatar">
          <span className="avatar-upload-label">modifier</span>

          <img src={props.user.picture} alt="profil pic" />
        </div>
        <div className="follow-check">
          {props.type === "otherUserProfil" && (
            <FollowHander idToFollow={props.user._id} type={"card"} />
          )}
        </div>
      </div>
      <ul className="nav-tabs">
        <li onClick={handleModal} className="tab-show" id="show">
          Bibliothèque
        </li>
        <li onClick={handleModal} className="tab-show" id="followers">
          Abonnés
        </li>
        <li onClick={handleModal} className="tab-show" id="followings">
          Abonnements
        </li>
      </ul>
      {bodyModal && <UserFavorite userId={props.user._id} />}
      {followersModal && (
        <div className="profil-body-followings">
          <h5>Abonnés : {props.user?.followers?.length}</h5>

          <ul>
            {usersData.map((user) => {
              for (let i = 0; i < props.user.followers.length; i++) {
                if (user._id === props.user.followers[i]) {
                  return (
                    <a href={`/user/${user._id}`}>
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4> {user.username}</h4>
                        <div className="follow-handler"></div>
                      </li>
                    </a>
                  );
                }
              }
            })}
          </ul>
        </div>
      )}
      {followingsModal && (
        <div className="profil-body-followings">
          <h3> Abonnements : {props.user?.following?.length}</h3>

          <ul>
            {usersData.map((user) => {
              for (let i = 0; i < props.user.following.length; i++) {
                if (user._id === props.user.following[i]) {
                  return (
                    <a href={`/user/${user._id}`}>
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4> {user.username}</h4>
                        <div className="follow-handler"></div>
                      </li>
                    </a>
                  );
                }
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
