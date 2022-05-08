import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import {
  getTimeString,
  getDateString,
  scheduleIdFromCalendar,
} from "../helpers";
import { useParams } from "react-router-dom";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";

const HOST = require("../globalVars.json").HOST;

function DayDetails(props) {
  const { user, token, updateCalendar } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const { year, monthIndex, day } = useParams();
  const [selectValue, setSelectValue] = useState(
    scheduleIdFromCalendar(user.calendrier, year, monthIndex, day)
  );

  useEffect(() => {
    const getDayDatas = async () => {
      try {
        let rep = await axios.get(`${HOST}/schedule/get/${selectValue}`);
        setScheduleDatas(rep.data.datas);
      } catch (e) {
        console.error(e);
      }
    };

    if (selectValue) {
      getDayDatas();
    }
  }, [selectValue]);

  const getValue = (val) => {
    setSelectValue(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postDatas = {
        scheduleId: selectValue,
        date: getDateString(year, monthIndex, day),
      };

      await axios.post(
        `${HOST}/users/${user._id}/calendar/add/schedule`,
        postDatas,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      updateCalendar(selectValue, year, monthIndex, day);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="DayDetails">
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
      <form onSubmit={handleSubmit}>
        <ScheduleSelect
          labelText={"Choose a schedule"}
          getValue={getValue}
          defVal={selectValue}
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}

export default DayDetails;