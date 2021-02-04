import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateBio } from "../../actions/user.actions";

function UpdateProfil() {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.user.id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="setting-page">
      <h2>Login</h2>
      <div className="img-part">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHD3N92mlHfopLSOZZpvyXGpcO19FdenrLA&usqp=CAU"
          alt="user pic"
        />
        <h4>Votre pseudo : {userData.user.username}</h4>
      </div>
      <div className="info-part">
        <h2>Informations</h2>
        <div className="bio-update">
          <h3> Bio </h3>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>
                {userData.user.bio}
              </p>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier bio
              </button>
            </>
          )}
          {updateForm && (
            <>
              <textarea
                type="text"
                defaultValue={userData.user.bio}
                onChange={(event) => setBio(event.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Valider changement</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfil;
