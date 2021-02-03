import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt,
} from "@fortawesome/fontawesome-free-solid";



function Logout() {

    const logout =  () =>{
          localStorage.clear();
          window.location="/";
    }
  return (
    <ul>

    <li onClick={logout}>
      <span>
        Me deconnecter <FontAwesomeIcon icon={"sign-out-alt"} />
      </span>
    </li>
    
    </ul>
   
  );
}

export default Logout;
