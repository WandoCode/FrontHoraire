import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { getScheduleDetailsFromCalendar, getTimeString } from "../helpers";
import { useParams } from "react-router-dom";

function DayDetails(props) {
  const { user } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const { year, monthIndex, day } = useParams();

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
  }, []);

  return (
    <div className="DayDetails">
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
  );
}

export default DayDetails;