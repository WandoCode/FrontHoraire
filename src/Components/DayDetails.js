import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import axios from "axios";
import { useParams } from "react-router-dom";

const HOST = require("../globalVars.json").HOST;

function DayDetails(props) {
  const { user } = useContext(AuthContext);
  const [scheduleDatas, setScheduleDatas] = useState();
  const { year, monthIndex, day } = useParams();

  useEffect(() => {
    getDayDatas(user._id, year, monthIndex, day);
  }, []);

  const getDayDatas = async (userId, year, monthIndex, day) => {
    try {
      const scheduleId = await getScheduleId(userId, year, monthIndex, day);
      let schedule = await getSchedule(scheduleId);
      let worktime = await getWorktime(schedule.workTime);

      setScheduleDatas({ schedule, worktime });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="DayDetails">
      {scheduleDatas && (
        <>
          <h2>Schedule</h2>
          <p>Name: {scheduleDatas.schedule.name}</p>
          <p>start: {scheduleDatas.worktime.startDate}</p>
          <p>end: {scheduleDatas.worktime.endDate}</p>
          <p>Break: {scheduleDatas.worktime.breakTime} min</p>
        </>
      )}
    </div>
  );
}

async function getWorktime(worktimeId) {
  let rep = await axios.get(`${HOST}/users/get/worktime/${worktimeId}`);
  return rep.data.datas;
}

const getSchedule = async (scheduleId) => {
  let rep = await axios.get(`${HOST}/schedule/get/${scheduleId}`);
  return rep.data.datas;
};

const getScheduleId = async (userId, year, monthIndex, day) => {
  let rep = await axios.get(`${HOST}/users/get/${userId}`);
  return rep.data.datas.calendrier[year][monthIndex][day].schedule;
};

export default DayDetails;