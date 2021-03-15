import React from "react";
import { MyFavorite } from "../../views/MyFavorite";
// import { Readlist } from "../Mangalist/Readlist";
// import { Readed } from "../Mangalist/Readed";
import { Add } from "../Mangalist/Add";

export const ProfilBody = () => {
  return (
    <div className="profil-body">
      <Add />
      <MyFavorite />

      {/* <Readlist />
      <Readed /> */}
    </div>
  );
};
