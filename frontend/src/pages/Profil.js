import React from "react";
import { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";
import { ProfilHeader } from "../components/Profil/ProfilHeader";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <div className="profil-page-container">
          <Navbar />
          <ProfilHeader body = {true} followings = {false} followers = {false} />
        </div>
      ) : (
        <div className="log-container">
          <h1>Page de profil</h1>
          <Log signin={true} signup={false} />
        </div>
      )}
    </div>
  );
};

export default Profil;
