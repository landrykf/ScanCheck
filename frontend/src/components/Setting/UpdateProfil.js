import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateBio, updateInfo } from "../../actions/user.actions";

function UpdateProfil() {
  const [bio, setBio] = useState("");
  // const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [updateForm, setUpdateForm] = useState(true);

  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
    let sUsername = username;

    if(sUsername == null){
        sUsername = userData.username;
    }
    if (email == null) {
        setEmail(userData.email);
    }
    
    dispatch(updateInfo(sUsername,email))


  };

  

  return (
    <div className="setting-page">
      <h2>Login</h2>
      <div className="img-part">
        <img
          src={userData.picture}
          alt="user pic"
        />
        <h4>Votre pseudo : {userData?.username}</h4>
      </div>
      <div className="info-part">

        <h2>Informations</h2>
        <div className="bio-update">
          <h5> Bio </h5>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>
                {userData?.bio}
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
                defaultValue={userData?.bio}
                onChange={(event) => setBio(event.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Valider changement</button>
            </>
          )}
        </div>

        <form action="" onSubmit={handleUpdate} id="form-update">
          <div className="username-update">


            <label htmlFor="username">Pseudo: </label>

            <input
              type="text"
              defaultValue={userData?.username}
              onChange={(event) => setUsername(event.target.value)}
            />
   
            <br/>    
            <label htmlFor="email">Email: </label>

            <input
            type="text"
            defaultValue={userData.email}
            onChange={(event) => setEmail(event.target.value)}
            />
            <br /> 
            
            <input type="submit" value="Valider" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfil;
