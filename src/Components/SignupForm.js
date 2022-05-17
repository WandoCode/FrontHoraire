import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { formatErrors } from "../helpers/helpers";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

const HOST = require("../globalVars.json").HOST;

function SignupForm() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [warningsArray, setWarningsArray] = useState([]);

  const navigate = useNavigate();

  // TODO: display errors on screen

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${HOST}/users/add`, { username, password });
      let rep = await axios.post(`${HOST}/login`, { username, password });
      let datas = rep.data;
      if (rep.data) signIn(datas.user, datas.token, navigate("/"));
    } catch (e) {
      const errorsArray = formatErrors(e.response.data);
      setWarningsArray(errorsArray);
    }
  };

  return (
    <form className="SignupForm" action="" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password-confirmation">Confirmer mot de passe</label>
        <input
          type="password"
          name="password-confirmation"
          id="password-confirmation"
          onChange={(e) => setConfPassword(e.target.value)}
          value={confPassword}
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

// TODO Ajouter une confirmation de succès ou d'erreur à l'envoi d'un formulaire
export default SignupForm;