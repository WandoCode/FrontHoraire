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
  const [warningsObj, setWarningsObj] = useState();

  useEffect(() => {
    if (warningsObj) console.error(warningsObj);
  }, [warningsObj]);

  useEffect(() => {
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
    if (!startDate || !endDate) return;
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
      // TODO: Uniformiser les '.datas' dans le backend (j'ai des .data et des .datas
      updateWorktime(rep.data.data.id, year, monthIndex, day);

      // TODO: Ce if est-il vrmt utile? (attrapé par le catch non?)
      if (!rep.data.success) {
        //showWarning()
        console.log("error");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmitWorktime} className="WorktimeChoice">
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
      <button type="submit">Change worktime</button>
    </form>
  );
}

export default WorktimeChoice;