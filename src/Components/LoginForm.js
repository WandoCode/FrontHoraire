import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { formatErrors } from "../helpers/helpers";

const axios = require("axios");

const HOST = require("../globalVars.json").HOST;

function LoginForm() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningsObj, setWarningsObj] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let rep = await axios.post(`${HOST}/login`, { username, password });
      let datas = rep.data;
      if (rep.data) signIn(datas.user, datas.token, navigate("/"));
    } catch (e) {
      const errorObject = formatErrors(e.response.data);
      setWarningsObj(errorObject);
    }
  };

  return (
    <form className="login-form" action="" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {warningsObj.username && (
          <div className="error">5-20 caractères: A-Z 1-9</div>
        )}
      </div>
      <div className="input-container">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {warningsObj.password && (
          <div className="error">8-20 caractères: A-Z 1-9</div>
        )}
      </div>
      <button type="submit">Connexion</button>
    </form>
  );
}

export default LoginForm;