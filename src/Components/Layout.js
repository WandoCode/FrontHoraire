import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";

function Layout(props) {
  const { user } = useContext(AuthContext);

  return (
    <div className="Layout">
      <nav>
        {user ? (
          /* User connected */
          <li>
            <NavLink to={"/"}>Accueil</NavLink>
            {user.role === "admin" && (
              <NavLink to={"/create/schedule"}>Horaires</NavLink>
            )}
            <NavLink to={"/logout"}>Déconnexion</NavLink>
          </li>
        ) : (
          /* NO user connected */
          <li>
            <NavLink to={"/login"}>Connexion</NavLink>
            <NavLink to={"/signup"}>Inscription</NavLink>
          </li>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;