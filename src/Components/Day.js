import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import {
  getScheduleDetailsFromCalendar,
  getWorkTimeDetailsFromCalendar,
} from "../helpers/dataFetch";
import { getTimeString } from "../helpers/date";
import { formatErrors } from "../helpers/helpers";

function Day(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;
  const day = props.day;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const [worktimeDatas, setWorktimeDatas] = useState();
  const [warningsObj, setWarningsObj] = useState();

  const classname = constructClass(
    props.currentMonth,
    props.weekend,
    props.today
  );

  useEffect(() => {
    if (warningsObj) console.error(warningsObj);
  }, [warningsObj]);

  useEffect(() => {
    // Load schedule and wortime details
    const getDayDatas = async () => {
      try {
        let schedule = await getScheduleDetailsFromCalendar(
          user.calendrier,
          year,
          monthIndex,
          day
        );
        setScheduleDatas(schedule);

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

    getDayDatas();
  }, [year, monthIndex, day, user]);

  function handleClick() {
    navigate(`/day/details/${props.year}/${props.monthIndex}/${props.day}`);
  }

  return (
    <td className={classname} onClick={handleClick}>
      {props.day}

      {scheduleDatas ? (
        <div>
          <div>{getTimeString(scheduleDatas.startDate)}</div>
          <div>{getTimeString(scheduleDatas.endDate)}</div>
          <div>({scheduleDatas.breakTime})</div>
        </div>
      ) : (
        <></>
      )}

      {worktimeDatas ? (
        <div>
          <div>{getTimeString(worktimeDatas.startDate)}</div>
          <div>{getTimeString(worktimeDatas.endDate)}</div>
          <div>({worktimeDatas.breakTime})</div>
        </div>
      ) : (
        <></>
      )}
    </td>
  );
}

const constructClass = (currentMonth, weekend, today) => {
  let classname = "Day";
  console.log(today);
  if (weekend) {
    classname += " weekend";
  }
  if (today) {
    classname += " today";
    return classname;
  }

  currentMonth ? (classname += " currentMonth") : (classname += " otherMonth");

  return classname;
};

export default Day;