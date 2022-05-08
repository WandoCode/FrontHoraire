import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import {
  getTimeString,
  getDateString,
  scheduleIdFromCalendar,
  getWorkTimeDetailsFromCalendar,
  formatDateWithTime,
} from "../helpers";
import { useParams } from "react-router-dom";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";

const HOST = require("../globalVars.json").HOST;

function DayDetails(props) {
  const { user, token, updateSchedules, updateWorktime } =
    useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const [worktimeDatas, setWorktimeDatas] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [breakTime, setBreakTime] = useState(0);
  const { year, monthIndex, day } = useParams();
  const [selectValue, setSelectValue] = useState(
    scheduleIdFromCalendar(user.calendrier, year, monthIndex, day)
  );
  const dateString = getDateString(year, monthIndex, day);

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
  }, []);

  useEffect(() => {
    if (worktimeDatas) {
      setStartDate(getTimeString(worktimeDatas.startDate));
      setEndDate(getTimeString(worktimeDatas.endDate));
      setBreakTime(worktimeDatas.breakTime);
    }
  }, [worktimeDatas]);

  useEffect(() => {
    const getScheduleDatas = async () => {
      try {
        let rep = await axios.get(`${HOST}/schedule/get/${selectValue}`);
        setScheduleDatas(rep.data.datas);
      } catch (e) {
        console.error(e);
      }
    };

    if (selectValue) {
      getScheduleDatas();
    }
  }, [selectValue]);

  const getValue = (val) => {
    setSelectValue(val);
  };

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    if (!selectValue) return;
    try {
      const postDatas = {
        scheduleId: selectValue,
        date: dateString,
      };

      await axios.post(
        `${HOST}/users/${user._id}/calendar/add/schedule`,
        postDatas,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      updateSchedules(selectValue, year, monthIndex, day);
    } catch (e) {
      console.error(e);
    }
  };

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
      <h2>{dateString}</h2>
      <div>
        {scheduleDatas && (
          <>
            <h2>Schedule</h2>
            <p>Name: {scheduleDatas.name}</p>
            <p>start: {getTimeString(scheduleDatas.startDate)}</p>
            <p>end: {getTimeString(scheduleDatas.endDate)}</p>
            <p>Break: {scheduleDatas.breakTime} min</p>
          </>
        )}
      </div>
      <form onSubmit={handleSubmitSchedule}>
        <ScheduleSelect
          labelText={"Choose a schedule"}
          getValue={getValue}
          defVal={selectValue}
        />
        <button type="submit">Change</button>
      </form>
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