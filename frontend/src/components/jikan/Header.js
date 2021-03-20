import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt,
} from "@fortawesome/fontawesome-free-solid";

function Header(){
    return (
        <header>
            <h1>SCAN CHECK</h1>
            <h1>le meilleur site de suivi de scan</h1>
        <div id="connexion-link">
          <NavLink exact to="/profil">
            <span>
              Mon profil <FontAwesomeIcon icon={"sign-in-alt"} />
            </span>
          </NavLink>
        </div>
        </header>
    )
}

export default Header