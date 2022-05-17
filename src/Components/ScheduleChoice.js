import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";
import { useState, useEffect } from "react";
import { getDateStringISO, getTimeString } from "../helpers/date";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { scheduleIdFromCalendar } from "../helpers/dataFetch";
import { formatErrors } from "../helpers/helpers";
import VAR from "../globalVars.json";

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
    // Reset values if date change
    setSelectValue(
      scheduleIdFromCalendar(user.calendrier, year, monthIndex, day)
    );
  }, [year, monthIndex, day]);

  useEffect(() => {
    const getScheduleDatas = async () => {
      // Load schedule datas
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
      setScheduleDatas();
    }
  }, [selectValue]);

  const getValue = (val) => {
    setSelectValue(val);
  };

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    // Avoid submit if no information in form
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
      {scheduleDatas && (
        <>
          <div className="details-container">
            <p>Nom: {scheduleDatas.name}</p>
            <p>Début: {getTimeString(scheduleDatas.startDate)}</p>
            <p>Fin: {getTimeString(scheduleDatas.endDate)}</p>
            <p>Pause: {scheduleDatas.breakTime} min</p>
          </div>
        </>
      )}
      <form onSubmit={handleSubmitSchedule}>
        <ScheduleSelect
          labelText={"Choisir un horaire"}
          getValue={getValue}
          defVal={selectValue}
        />
        <button type="submit">Choisir</button>
      </form>
    </div>
  );
}

export default ScheduleChoice;