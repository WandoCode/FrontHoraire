import { useState, useEffect } from "react";
import { getDateStringISO, getTimeString } from "../helpers/date";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";
import VAR from "../globalVars.json";

import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { scheduleIdFromCalendar } from "../helpers/dataFetch";
import { formatErrors } from "../helpers/helpers";

const HOST = VAR.HOST;

function ScheduleChoice(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;
  const day = props.day;
  const dateString = getDateStringISO(year, monthIndex, day);
  const [warningsObj, setWarningsObj] = useState();
  const { user, token, updateSchedules } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const [selectValue, setSelectValue] = useState(
    scheduleIdFromCalendar(user.calendrier, year, monthIndex, day)
  );

  useEffect(() => {
    if (warningsObj) console.error(warningsObj);
  }, [warningsObj]);

  useEffect(() => {
    setSelectValue(
      scheduleIdFromCalendar(user.calendrier, year, monthIndex, day)
    );
  }, [year, monthIndex, day]);

  useEffect(() => {
    const getScheduleDatas = async () => {
      try {
        let rep = await axios.get(`${HOST}/schedule/get/${selectValue}`);
        setScheduleDatas(rep.data.data);
      } catch (e) {
        const errorObject = formatErrors(e.response.data);
        setWarningsObj(errorObject);
      }
    };

    if (selectValue) {
      getScheduleDatas();
    } else {
      // TODO Added to updatewith nextday and lastday btn
      setScheduleDatas();
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
      const errorObject = formatErrors(e.response.data);
      setWarningsObj(errorObject);
    }
  };

  return (
    <div className="ScheduleChoice">
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
    </div>
  );
}

export default ScheduleChoice;