import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonLogOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <div className="Logout">
      <button onClick={handleButtonLogOut}>LogOut</button>
    </div>
  );
}

export default Logout;