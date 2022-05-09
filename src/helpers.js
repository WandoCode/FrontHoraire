import axios from "axios";
import VAR from "./globalVars.json";

const HOST = VAR.HOST;
const WEEKEND_POSITION = VAR.WEEKEND_POSITION;
const MONTH = VAR.MONTH;

/* Return errors message in an array */
const formatErrors = (responseDatas) => {
  const validationErrors = responseDatas.validationErrors;
  let errorsArray = [];

  // Handle validation errors
  if (validationErrors) {
    errorsArray = validationErrors.errors.map((err) => {
      return err.msg;
    });
  }
  // Handle other errors
  else {
    errorsArray.push(responseDatas.message);
  }
  return errorsArray;
};

const calendar = {
  getNbrDaysInMonth: (year, monthIndex) => {
    let date = new Date(year, monthIndex + 1, 0);
    return date.getDate();
  },
  // Return the day starting month: 0 = sunday, 6 = saturday
  getFirstDayMonthIndex: (year, monthIndex) => {
    let date = new Date(year, monthIndex, 1);

    return (date.getDay() + 6) % 7;
  },

  // return an array of 42 days for the given monthIndex
  constructCalendarArray: function (year, monthIndex) {
    // Current month
    let nbrDaysInMonth = this.getNbrDaysInMonth(year, monthIndex);
    let firstDayMonthIndex = this.getFirstDayMonthIndex(year, monthIndex);

    // Month before
    let nbrDaysInMonthBefore = this.getNbrDaysInMonth(year, monthIndex - 1);

    // Month after
    let trailingDays = 42 - firstDayMonthIndex - nbrDaysInMonth; //42 days = 6 weeks

    /* Construct array */
    let monthArray = [];
    let arrayIndex = 0;
    // Days before current month
    for (let i = 0; i < firstDayMonthIndex; i++) {
      let { newYear, newMonthIndex } = this.lastMonth(year, monthIndex);

      monthArray.push({
        day: nbrDaysInMonthBefore - firstDayMonthIndex + i + 1,
        monthIndex: newMonthIndex,
        year: newYear,
        currentMonth: false,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    //  Current month's days
    for (let i = 0; i < nbrDaysInMonth; i++) {
      monthArray.push({
        day: i + 1,
        monthIndex: monthIndex,
        year: year,
        currentMonth: true,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    // Days after current month
    for (let i = 0; i < trailingDays; i++) {
      let { newYear, newMonthIndex } = this.nextMonth(year, monthIndex);
      monthArray.push({
        day: i + 1,
        monthIndex: newMonthIndex,
        year: newYear,
        currentMonth: false,
        weekend: WEEKEND_POSITION.includes(arrayIndex),
      });
      arrayIndex++;
    }
    return monthArray;
  },
  // Return the next month
  nextMonth: (year, monthIndex) => {
    let newMonthIndex = monthIndex + 1;
    let newYear = year;
    if (newMonthIndex >= 12) {
      newMonthIndex = 0;
      newYear = year + 1;
    }
    return { newYear, newMonthIndex };
  },
  // Return the last month
  lastMonth: (year, monthIndex) => {
    let newMonthIndex = monthIndex - 1;
    let newYear = year;
    if (newMonthIndex <= -1) {
      newMonthIndex = 11;
      newYear = year - 1;
    }
    return { newYear, newMonthIndex };
  },
};

// Return a String representing a date
// TODO Remove if not used
const formatDateMonth = (year, monthIndex) => {
  let month = monthIndex + 1;
  return `${year}-${month}`;
};

const getScheduleDetailsFromCalendar = async (
  userCalendar,
  year,
  monthIndex,
  day
) => {
  let scheduleId = scheduleIdFromCalendar(userCalendar, year, monthIndex, day);
  if (scheduleId) {
    let rep = await axios.get(`${HOST}/schedule/get/${scheduleId}`);
    return rep.data.datas;
  }
};
const scheduleIdFromCalendar = (userCalendar, year, monthIndex, day) => {
  return (
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
    return rep.data.datas;
  }
};

const worktimeIdFromCalendar = (userCalendar, year, monthIndex, day) => {
  return (
    ((((userCalendar || {})[year] || {})[monthIndex] || {})[day] || {})[
      "workTime"
    ] || null
  );
};
const getTimeString = (stringDate) => {
  const date = new Date(stringDate);
  let hour = `${date.getHours()}`;
  let min = `${date.getMinutes()}`;

  hour = hour.length !== 2 ? "0" + hour : hour;
  min = min.length !== 2 ? "0" + min : min;

  return `${hour}:${min}`;
};

const getDateString = (yearInt, monthIndex, dayInt) => {
  let date = new Date(yearInt, monthIndex, dayInt);
  const dateString = date.toISOString();

  return dateString.slice(0, 10);
};

const createPathCal = (calendrier, { day, monthIndex, year }) => {
  // Check if the year, month and day are already in the calendrier
  // Create path if necessary
  if (!calendrier[year]) {
    calendrier[year] = {};
  }

  if (!calendrier[year][monthIndex]) {
    calendrier[year][monthIndex] = {};
  }

  if (!calendrier[year][monthIndex][day]) {
    calendrier[year][monthIndex][day] = {};
  }

  return calendrier;
};

function formatDateWithTime(time) {
  return `2022-01-01T${time}`;
}

const getMonthText = (year, monthIndex) => {
  const monthString = MONTH[monthIndex];
  return `${year} - ${monthString}`;
};

export {
  formatErrors,
  calendar,
  formatDateMonth,
  getScheduleDetailsFromCalendar,
  scheduleIdFromCalendar,
  getTimeString,
  getDateString,
  createPathCal,
  getWorkTimeDetailsFromCalendar,
  formatDateWithTime,
  getMonthText,
};