import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

let AuthContext = React.createContext({ user: null, token: null });

// This component will warp ({children}) lower component to be able to use Context
// User datas will be passed between component with Context.
// User datas will be saved in cookies to keep an active session after login.
function AuthContextProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState(cookies.user ? cookies.user : null);
  const [token, setToken] = useState(cookies.token ? cookies.token : null);

  // Sign in user
  const signIn = (newUser, token, cb) => {
    // Save new datas into context
    setUser(newUser);
    setToken(token);

    /* Keep datas in cookies */
    setCookie("token", token);
    setCookie("user", newUser);
    if (cb) cb();
  };

  // Sign out user
  const signOut = (cb) => {
    setUser(null);
    setToken(null);

    removeCookie("token");
    removeCookie("user");
    if (cb) cb();
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Componenet check if a user exists and is logged in
function RequireAuth({ children }) {
  let { user } = useContext(AuthContext);
  // No user found: redirect
  if (!user) return <Navigate to="/login" replace />;

  // User found: return children react node without change.
  return children;
}
// Check if tu current user is an admin otherwise redirect
function RequireAdmin({ children }) {
  let { user } = useContext(AuthContext);

  // User connected?
  if (!user) return <Navigate to="/login" replace />;

  // User is Admin?
  if (user.role !== "admin") return <Navigate to="/login" replace />;

  return children;
}

export { AuthContextProvider, AuthContext, RequireAuth, RequireAdmin };