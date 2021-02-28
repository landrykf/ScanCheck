import React from "react";
import { useSelector } from "react-redux";
import { UploadImg } from "./UploadImg";

export const ProfilHeader = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  return (
    <div>
      <div className="bannere"></div>
      <h2> {userData.username}</h2>
      <div className="profil-nav"></div>
      <div className="avatar">
        <img src={userData.picture} alt="photo de profil" />
        <UploadImg/>
      </div>
    </div>
  );
};
