import axios from "axios";
import VAR from "../globalVars.json";

const HOST = VAR.HOST;

const getScheduleDetailsFromCalendar = async (
  userCalendar,
  year,
  monthIndex,
  day
) => {
  let scheduleId = scheduleIdFromCalendar(userCalendar, year, monthIndex, day);
  if (scheduleId) {
    let rep = await axios.get(`${HOST}/schedule/get/${scheduleId}`);
    return rep.data.data;
  }
};
const scheduleIdFromCalendar = (userCalendar, year, monthIndex, day) => {
  return (
    // Go into userCalendar.year.monthIndex.day safely (even in a nested object is undefined)
    ((((userCalendar || {})[year] || {})[monthIndex] || {})[day] || {})[
      "schedule"
    ] || null
  );
};
const getWorkTimeDetailsFromCalendar = async (
  userCalendar,
  year,
  monthIndex,
  day
) => {
  let worktimeId = worktimeIdFromCalendar(userCalendar, year, monthIndex, day);
  if (worktimeId) {
    let rep = await axios.get(`${HOST}/users/get/worktime/${worktimeId}`);
    return rep.data.data;
  }
};
const worktimeIdFromCalendar = (userCalendar, year, monthIndex, day) => {
  return (
    // Go into userCalendar.year.monthIndex.day safely (even in a nested object is undefined)
    ((((userCalendar || {})[year] || {})[monthIndex] || {})[day] || {})[
      "workTime"
    ] || null
  );
};
export {
  getWorkTimeDetailsFromCalendar,
  scheduleIdFromCalendar,
  getScheduleDetailsFromCalendar,
};