import { useState, useEffect } from "react";
import { getWorkTimeDetailsFromCalendar } from "../helpers/dataFetch";
import {
  formatDateWithTime,
  getDateStringISO,
  getTimeString,
} from "../helpers/date";
import axios from "axios";
import VAR from "../globalVars.json";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { formatErrors } from "../helpers/helpers";

const HOST = VAR.HOST;

function WorktimeChoice(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;
  const day = props.day;
  const { user, token, updateWorktime } = useContext(AuthContext);
  const [worktimeDatas, setWorktimeDatas] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [breakTime, setBreakTime] = useState(0);
  const dateString = getDateStringISO(year, monthIndex, day);
  const [warningsObj, setWarningsObj] = useState({});

  useEffect(() => {
    // Reset value if date change
    setStartDate("");
    setEndDate("");
    setBreakTime(0);
  }, [year, monthIndex, day]);

  useEffect(() => {
    const getWorktimeDatas = async () => {
      try {
        let worktime = await getWorkTimeDetailsFromCalendar(
          user.calendrier,
          year,
          monthIndex,
          day
        );
        setWorktimeDatas(worktime);
      } catch (e) {
        const errorObject = formatErrors(e.response.data);
        setWarningsObj(errorObject);
      }
    };

    getWorktimeDatas();
  }, [user.calendrier, year, monthIndex, day]);

  useEffect(() => {
    if (worktimeDatas) {
      setStartDate(getTimeString(worktimeDatas.startDate));
      setEndDate(getTimeString(worktimeDatas.endDate));
      setBreakTime(worktimeDatas.breakTime);
    }
  }, [worktimeDatas]);

  const handleSubmitWorktime = async (e) => {
    e.preventDefault();
    // TODO: need to implement validation

    try {
      let rep = await axios.post(
        `${HOST}/users/${user._id}/calendar/add/worktime`,
        {
          startDate: formatDateWithTime(startDate),
          endDate: formatDateWithTime(endDate),
          breakTime: breakTime,
          date: dateString,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      updateWorktime(rep.data.data.id, year, monthIndex, day);
    } catch (e) {
      const errorObject = formatErrors(e.response.data);
      setWarningsObj(errorObject);
    }
  };

  return (
    <form onSubmit={handleSubmitWorktime} className="WorktimeChoice">
      <div className="double-input">
        <div className="input-container">
          <label htmlFor="startDate">Début</label>
          <input
            type="time"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {warningsObj.startDate && <div className="error">Obligatoire</div>}
        </div>
        <div className="input-container">
          <label htmlFor="endDate">Fin</label>
          <input
            type="time"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="breaktime">Pause (min)</label>
        <input
          type="number"
          name="breaktime"
          id="breaktime"
          min={0}
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
        />
      </div>
      <button type="submit">Modifier</button>
    </form>
  );
}

export default WorktimeChoice;