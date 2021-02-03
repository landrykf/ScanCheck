import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";

// import  { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt,
} from "@fortawesome/fontawesome-free-solid";

function Navbar() {
  const uid = useContext(UidContext);

  return (
    <div className="nav-container">
      <div className="logo">
        <NavLink exact to="/">
          <img src="./img/logo.png" alt="logo" width="100" />
          <span>Scancheck</span>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li className="welcome">
            <NavLink exact to="/account">
              <h5>Bienvenu "valeur dynamique"</h5>
              <span>
                Me deconnecter <FontAwesomeIcon icon={"sign-out-alt"} />
              </span>
            </NavLink>
          </li>
        </ul>
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
