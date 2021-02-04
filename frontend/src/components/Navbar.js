import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

// import {
//   faCheckSquare,
//   faCoffee,
//   faSignInAlt,
// } from "@fortawesome/fontawesome-free-solid";

function Navbar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // console.log(uid);

  return (
    <div className="nav-container">
      <div className="logo">
        <NavLink exact to="/">
          <img src="./img/logo.png" alt="logo" width="100" />
          <span>Scancheck</span>
        </NavLink>
      </div>
      {uid ? (
        <div>
          <ul>
            <li className="welcome">
              <NavLink exact to="/">
                <h5>
                  Bienvenu 
                  {uid.user.username}
                </h5>
                <Logout />
              </NavLink>
            </li>
          </ul>
          <div className="icons">
            <div className="icons-bis">
              <NavLink to='/profil' exact activeClassName="active-icon-nav">
                <span><FontAwesomeIcon icon={"user-circle"} /> profil</span>
              </NavLink>
              <br/>
              <NavLink to='/account' exact activeClassName="active-icon-nav">
                <span><FontAwesomeIcon icon={"user-cog"} /> reglages</span>
              </NavLink>
              <br/>
              <NavLink to='/explore' exact activeClassName="active-icon-nav">
                <span><FontAwesomeIcon icon={"compass"} /> explorer</span>
              </NavLink>

            </div>
          </div>
        </div>
      ) : (
        <ul>
          <NavLink exact to="/profil">
            <span>
              login <FontAwesomeIcon icon={"sign-in-alt"} />
            </span>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
