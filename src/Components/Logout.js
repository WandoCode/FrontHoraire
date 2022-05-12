import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonLogOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <div className="Logout">
      <button onClick={handleButtonLogOut}>Déconnexion</button>
    </div>
  );
}

export default Logout;