import React from "react";
import {useDispatch, useSelector} from "react-redux"
import{useState} from "react"
import { uploadBanner } from "../../actions/user.actions";

export const UploadBanner = () => {
  const [banner, setbanner] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleBanner = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.username);
    data.append("userId", userData._id)
    data.append("file", banner);

    dispatch(uploadBanner(data, userData._id));
  };
  return (
    <form action="" onSubmit={handleBanner} className="upload-banner-pic">
      <label htmlFor="banner">changer la bannière</label>
      <input
        type="file"
        id="banner"
        name="banner"
        accept=".jpg, .jpeg, .png "
        onChange={(e) => setbanner(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Enregistrer" />
    </form>
  );
};
