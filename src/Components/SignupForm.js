import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { formatErrors } from "../helpers";
import { AuthContext } from "../AuthContextProvider";
import { useNavigate } from "react-router-dom";

const HOST = require("../globalVars.json").HOST;

function SignupForm(props) {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [warningsArray, setWarningsArray] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let rep = await axios.post(`${HOST}/login`, { username, password });
      let datas = rep.data;
      if (rep.data) signIn(datas.user, datas.token, navigate("/home"));
    } catch (e) {
      const errorsArray = formatErrors(e.response.data);
      setWarningsArray(errorsArray);
    }
  };

  // TODO: display errors on screen
  useEffect(() => {
    if (warningsArray.length > 0) console.error(warningsArray);
  }, [warningsArray]);

  return (
    <form className="SignupForm" action="" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label htmlFor="password-confirmation">Confirm password</label>
      <input
        type="text"
        name="password-confirmation"
        id="password-confirmation"
        onChange={(e) => setConfPassword(e.target.value)}
        value={confPassword}
      />
      <button type="submit">Create account</button>
    </form>
  );
}

export default SignupForm;