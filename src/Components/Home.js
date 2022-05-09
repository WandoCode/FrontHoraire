import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOutButton = () => {
    navigate("/logout");
  };

  const handleLogInButton = () => {
    navigate("/login");
  };

  return (
    <div className="Home">
      {user ? (
        <div>
          <p>Bienvenue {user.username}</p>
          <button onClick={handleLogOutButton}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Please Log in</p>
          <button onClick={handleLogInButton}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default Home;