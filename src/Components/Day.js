import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { getScheduleDetailsFromCalendar, getTimeString } from "../helpers";

function Day(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;
  const day = props.day;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
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
      } catch (e) {
        console.error(e);
      }
    };

    getDayDatas();
  }, [year, monthIndex, user]);

  function handleClick() {
    navigate(`/day/details/${props.year}/${props.monthIndex}/${props.day}`);
  }

  return (
    <td className={classname} onClick={handleClick}>
      {props.day}
      <br />
      {scheduleDatas ? (
        <>
          <div>{getTimeString(scheduleDatas.startDate)}</div>
          <div>{getTimeString(scheduleDatas.endDate)}</div>
          <div>({scheduleDatas.breakTime})</div>
        </>
      ) : (
        <></>
      )}
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