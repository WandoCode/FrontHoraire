import VAR from "../globalVars.json";

const MONTH = VAR.MONTH;

const getTimeString = (stringDate) => {
  /* Return HH:mm */
  const date = new Date(stringDate);
  let hour = `${date.getHours()}`;
  let min = `${date.getMinutes()}`;

  hour = hour.length !== 2 ? "0" + hour : hour;
  min = min.length !== 2 ? "0" + min : min;

  return `${hour}:${min}`;
};

const getDateStringISO = (yearInt, monthIndex, dayInt) => {
  /* Return DD/MM/YYYY */
  let date = new Date(yearInt, monthIndex, dayInt);
  const dateString = date.toISOString();
  return dateString.slice(0, 10);
};

const getDateStringLocal = (yearInt, monthIndex, dayInt) => {
  /* Get YYYY-MM-DD */
  let date = new Date(yearInt, monthIndex, dayInt);
  const dateString = date.toLocaleString();
  return dateString.slice(0, 10);
};

function formatDateWithTime(time) {
  /* Create a factice date string with a choosen time */
  return `2022-01-01T${time}`;
}

const getMonthText = (year, monthIndex) => {
  /* Change monthIndex to his name (ex: 4 = Mai) */
  const monthString = MONTH[monthIndex];
  return `${year} - ${monthString}`;
};
export {
  getMonthText,
  formatDateWithTime,
  getDateStringISO,
  getTimeString,
  getDateStringLocal,
};