import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContextProvider";
import { formatDateWithTime, getTimeString } from "../helpers/date";
import { formatErrors } from "../helpers/helpers";

const HOST = require("../globalVars.json").HOST;

function ScheduleForm(props) {
  const propsName = props.name;
  const propsStartDate = props.startDate;
  const propsEndDate = props.endDate;
  const propsBreakTime = props.breakTime;
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [breakTime, setBreakTime] = useState(0);
  const [warningsObj, setWarningsObj] = useState({});

  //TODO: avoid submit if schedule to update has not changed
  //TODO: idem for new schedule with invalid datas (and for update)
  //TODO Ajouter la possibilité de faire un horaire sur 2 jours (ajouter une case qui l'indique et qui fait que la
  // fct getTimeString ajouter 24h à la date qu'elle utilise par defaut
  /* Change input value if they are changed after render by props */
  useEffect(() => {
    if (propsName) setName(propsName);
    if (propsStartDate) setStartDate(getTimeString(propsStartDate));
    if (propsEndDate) setEndDate(getTimeString(propsEndDate));
    if (propsBreakTime) setBreakTime(propsBreakTime);
  }, [props]);

  // TODO: display errors on screen

  async function handleUpdate(e) {
    e.preventDefault();
    resetForm();
    try {
      if (!validInputs()) return; // TODO: need to be implemented

      /* Update values */
      let rep = await axios.put(
        `${HOST}/schedule/put/${props.scheduleId}`,
        {
          name,
          startDate: formatDateWithTime(startDate),
          endDate: formatDateWithTime(endDate),
          breakTime: breakTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      const errorObject = formatErrors(e.response.data);
      setWarningsObj(errorObject);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    resetForm();
    try {
      if (!validInputs()) return; // TODO: need to be implemented

      /* Post new values */
      await axios.post(
        `${HOST}/schedule/add`,
        {
          name,
          startDate: formatDateWithTime(startDate),
          endDate: formatDateWithTime(endDate),
          breakTime: breakTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      console.log(e.response);
      const errorObject = formatErrors(e.response.data);
      setWarningsObj(errorObject);
    }
  };

  const resetForm = () => {
    setWarningsObj({});
    setName("");
    setStartDate("");
    setEndDate("");
    setBreakTime(0);
  };

  return (
    <form className="ScheduleForm form--dates" action={""}>
      <label htmlFor="name">Nom</label>
      <input
        type="text"
        name="name"
        id="name"
        className={warningsObj.name ? "error" : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={"dates"}>
        <div className="start">
          <label htmlFor="startDate">Début</label>
          <input
            type="time"
            name="startDate"
            id="startDate"
            className={
              warningsObj.startDate || warningsObj.endDate ? "error" : ""
            }
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="end">
          <label htmlFor="endDate">Fin</label>
          <input
            type="time"
            name="endDate"
            id="endDate"
            className={
              warningsObj.startDate || warningsObj.endDate ? "error" : ""
            }
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="breaktime">Pause (min)</label>
      <input
        type="number"
        name="breaktime"
        id="breaktime"
        className={warningsObj.breakTime ? "error" : ""}
        min={0}
        value={breakTime}
        onChange={(e) => setBreakTime(e.target.value)}
      />

      {props.update ? (
        <div className="btnsContainer">
          <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
      ) : (
        <button onClick={handleCreate}>Créer</button>
      )}
    </form>
  );
}

// TODO: a fct to valid inputs
const validInputs = () => {
  return true;
};

export default ScheduleForm;