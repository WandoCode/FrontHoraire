import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import burger from "../static/img/burger.svg";

function Layout() {
  const { user } = useContext(AuthContext);

  const handleBurger = () => {
    const nav = document.getElementsByTagName("nav")[0];
    nav.classList.contains("small")
      ? nav.classList.remove("small")
      : nav.classList.add("small");
  };

  return (
    <div className="Layout">
      <img
        className={"burger"}
        src={burger}
        alt="menu button"
        onClick={handleBurger}
      />

      <nav className="nav">
        <ul>
          {user ? (
            /* User connected */
            <>
              <li>
                <NavLink to={"/"}>Accueil</NavLink>
              </li>
              {user.role === "admin" && (
                <li>
                  <NavLink to={"/create/schedule"}>Horaires</NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/logout"}>Déconnexion</NavLink>
              </li>
            </>
          ) : (
            /* NO user connected */
            <>
              <li>
                <NavLink to={"/login"}>Connexion</NavLink>
              </li>
              <li>
                <NavLink to={"/signup"}>Inscription</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;