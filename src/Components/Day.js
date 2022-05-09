import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import {
  getScheduleDetailsFromCalendar,
  getWorkTimeDetailsFromCalendar,
} from "../helpers/dataFetch";
import { getTimeString } from "../helpers/date";

function Day(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;
  const day = props.day;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const [worktimeDatas, setWorktimeDatas] = useState();
  const classname = constructClass(props.currentMonth, props.weekend);

  useEffect(() => {
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
        console.error(e);
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
      <div>
        {scheduleDatas ? (
          <>
            <div>{getTimeString(scheduleDatas.startDate)}</div>
            <div>{getTimeString(scheduleDatas.endDate)}</div>
            <div>({scheduleDatas.breakTime})</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {worktimeDatas ? (
          <>
            <div>{getTimeString(worktimeDatas.startDate)}</div>
            <div>{getTimeString(worktimeDatas.endDate)}</div>
            <div>({worktimeDatas.breakTime})</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </td>
  );
}

const constructClass = (currentMonth, weekend) => {
  let classname = "Day";
  currentMonth ? (classname += " currentMonth") : (classname += " otherMonth");
  if (weekend) {
    classname += " weekend";
  }
  return classname;
};

export default Day;