import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContextProvider";
import { getTimeString } from "../helpers";

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

  /* Change input value if they are changed after render by props */
  useEffect(() => {
    if (propsName) setName(propsName);
    if (propsStartDate) setStartDate(getTimeString(propsStartDate));
    if (propsEndDate) setEndDate(getTimeString(propsEndDate));
    if (propsBreakTime) setBreakTime(propsBreakTime);
  }, [props]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validInputs()) return; // TODO: need to be implemented

    if (props.update) {
      let rep = await axios.put(
        `${HOST}/schedule/put/${props.scheduleId}`,
        {
          name,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          breakTime: breakTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(rep.data);
      // TODO: Show a warning on screen to let user know schedule has not been created and why
      // TODO: A refactoriser avec la warningArray de SignupForm???
      if (!rep.data.success) {
        //showWarning()
        console.log("error");
      }
    } else {
      let rep = await axios.post(
        `${HOST}/schedule/add`,
        {
          name,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          breakTime: breakTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // TODO: Show a warning on screen to let user know schedule has not been created and why
      // TODO: A factoriser avec la warningArray de SignupForm???
      if (!rep.data.data.success) {
        //showWarning()
        console.log("error");
      }
    }
    return;
  }

  return (
    <form className="ScheduleForm" action={""} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="startDate">Start</label>
      <input
        type="time"
        name="startDate"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">End</label>
      <input
        type="time"
        name="endDate"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <label htmlFor="breaktime">Break (min)</label>
      <input
        type="number"
        name="breaktime"
        id="breaktime"
        min={0}
        value={breakTime}
        onChange={(e) => setBreakTime(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

// TODO: a fct to valid inputs
const validInputs = () => {
  return true;
};

function formatDate(time) {
  return `2022-01-01T${time}`;
}

export default ScheduleForm;