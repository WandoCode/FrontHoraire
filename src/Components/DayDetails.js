import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { useParams } from "react-router-dom";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";
import {
  getWorkTimeDetailsFromCalendar,
  scheduleIdFromCalendar,
} from "../helpers/dataFetch";
import {
  formatDateWithTime,
  getDateStringISO,
  getTimeString,
  getDateStringLocal,
} from "../helpers/date";
import ScheduleChoice from "./ScheduleChoice";

const HOST = require("../globalVars.json").HOST;
// TODO Add a button to go back to calendar AT THE SAME MONTH THAN THE MONTH OF THIS PAGE
// TODO 2 : Add a btn to go 1 day before or one day after without going back to calendar
function DayDetails() {
  const { user, token, updateWorktime } = useContext(AuthContext);
  const [worktimeDatas, setWorktimeDatas] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [breakTime, setBreakTime] = useState(0);
  const { year, monthIndex, day } = useParams();
  const dateString = getDateStringISO(year, monthIndex, day);

  useEffect(() => {
    const getWorktimeDatas = async () => {
      let worktime = await getWorkTimeDetailsFromCalendar(
        user.calendrier,
        year,
        monthIndex,
        day
      );
      setWorktimeDatas(worktime);
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
    <div className="DayDetails">
      <h2>{getDateStringLocal(year, monthIndex, day)}</h2>
      <ScheduleChoice year={year} monthIndex={monthIndex} day={day} />
      <form onSubmit={handleSubmitWorktime}>
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
    </div>
  );
}

export default DayDetails;