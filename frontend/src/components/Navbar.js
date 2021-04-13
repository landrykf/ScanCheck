import React from "react";
// import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Add } from "./Mangalist/Add";

//partie 2

// import {Add} from './Mangalist/Add'

function Navbar() {
  //TODO: utiliser "uid" une condition ternaire pour gérer l'affichage des pages quant l'utilisateur est connecté ou pas
  // const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);
  // console.log(userData);

  return (
    <div className="nav-container">
      <div className="logo">
        <div id="logo">
          <NavLink to="/" exact activeClassName="active-icon-nav">
            <img src="../img/logo.png" alt="logo" width="100" />
            <h2>Scancheck</h2>
          </NavLink>
        </div>

        {/* <Add/> */}

        <div className="icons">
          <div className="icons-bis">
            <NavLink to="/profil" exact activeClassName="active-icon-nav">
              <span>
                <FontAwesomeIcon icon={"user-circle"} /> profil
              </span>
            </NavLink>
            <br />
            <NavLink to="/account" exact activeClassName="active-icon-nav">
              <span>
                <FontAwesomeIcon icon={"user-cog"} /> reglages
              </span>
            </NavLink>
            <br />
            <NavLink to="/explorer" exact activeClassName="active-icon-nav">
              <span>
                <FontAwesomeIcon icon={"compass"} /> explorer
              </span>
            </NavLink>
            <br />
            <NavLink to="/watchlist" exact activeClassName="active-icon-nav">
              <span>
                <FontAwesomeIcon icon={"user-cog"} /> watchlist
              </span>
            </NavLink>

            <h5>{" " + userData?.username}</h5>

            <ul>
              <li className="welcome">
                <NavLink exact to="/">
                  <Logout />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
