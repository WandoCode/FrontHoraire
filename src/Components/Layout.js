import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";

function Layout(props) {
  const { user } = useContext(AuthContext);

  return (
    <div className="Layout">
      <nav>
        {user ? (
          /* User connected */
          <>
            <Link to={"/"}> Accueil </Link>
            {user.role === "admin" && (
              <Link to={"/create/schedule"}> Horaires </Link>
            )}
            <Link to={"/logout"}> Log Out </Link>
          </>
        ) : (
          /* NO user connected */
          <>
            <Link to={"/login"}> Log In </Link>
            <Link to={"/signup"}> Sign Up</Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;