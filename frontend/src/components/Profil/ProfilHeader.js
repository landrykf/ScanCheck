import React from "react";
import { useSelector } from "react-redux";
import { UploadImg } from "./UploadImg";
import {useState} from "react"
import { ProfilBody } from "./ProfilBody";
import { ProfilFollowers } from "./ProfilFollowers";
import { ProfilFollowings } from "./ProfilFollowings";



export const ProfilHeader = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const [followersModal, setFollowersModal] = useState(props.followers);
  const [followingsModal, setFollowingsModal] = useState(props.followings);
  const [bodyModal, setBodyModal] = useState(props.body)

  let handleModal = (event) => {
    if(event.target.id === "followings"){
      setFollowersModal(false);
      setBodyModal(false)
      setFollowingsModal(true)
    }else if(event.target.id === "followers"){
      setFollowingsModal(false);
      setBodyModal(false);
      setFollowersModal(true)
    }else if(event.target.id === "show"){
      setFollowingsModal(false);
      setBodyModal(true);
      setFollowersModal(false)
    }
  }



  return (
    <div className="profil-head-container">
      <div className="bannere">
        <h2> {userData.username}</h2>
      </div>
      <div className="profil-nav">
        <div className="avatar">
          <img src={userData.picture} alt="profil pic" />
          <UploadImg />
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
      </div>
        {bodyModal && <ProfilBody />}
        {followersModal && <ProfilFollowers />}
        {followingsModal && <ProfilFollowings />}
    </div>
  );
};
