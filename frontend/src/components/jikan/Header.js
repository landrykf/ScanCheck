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
        <NavLink exact to="/profil">
          <span>
            Mon profil <FontAwesomeIcon icon={"sign-in-alt"} />
          </span>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
