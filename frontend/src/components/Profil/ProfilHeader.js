import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UploadImg } from "./UploadImg";


import { Readlist } from "../Mangalist/Readlist";
import { Readed } from "../Mangalist/Readed";
import { Add } from "../Mangalist/Add"

export const ProfilHeader = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
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
          <li className="tab-show">
              <div className="label">Bibliothèque</div>
          </li>
          <li className="tab-show">
              <div className="label">Abonnés</div>
          </li>
          <li className="tab-show">
              <div className="label">Abonnements</div>
          </li>
        </ul>
      </div>
      <div className="profil-body">
          <Add />
          <Readlist />
          <Readed />
      </div>
    </div>
  );
};
