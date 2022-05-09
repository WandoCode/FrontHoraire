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
  const [warningsArray, setWarningsArray] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let rep = await axios.post(`${HOST}/login`, { username, password });
      let datas = rep.data;
      if (rep.data) signIn(datas.user, datas.token, navigate("/"));
    } catch (e) {
      // TODO: Add a useEffect to display warning validation if it exists
      const errorsArray = formatErrors(e.response.data);
      setWarningsArray(errorsArray);
    }
  };

  // TODO: display errors on screen
  useEffect(() => {
    if (warningsArray.length > 0) console.error(warningsArray);
  }, [warningsArray]);

  return (
    <form className="login-form" action="" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;