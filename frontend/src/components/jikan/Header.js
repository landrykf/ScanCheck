import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt,
} from "@fortawesome/fontawesome-free-solid";

function Header() {
  return (
    <div className="head">
      <div id="connexion-link">
        <img src="../img/logo.png" alt="logo" />
        <div className="leftPart">
          <h1>SCAN CHECK</h1>
        </div>
        <NavLink exact to="/profil">
          <div className="connection-btn">
            Mon profil <FontAwesomeIcon icon={"sign-in-alt"} />
          </div>
        </NavLink>
      </div>
      <h2>Votre site de suivi de manga</h2>
    </div>
  );
}

export default Header;
