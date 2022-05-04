import { useState } from "react";
import { calendar, formatDateMonth } from "../helpers";
import Day from "./Day";
import uniqid from "uniqid";

function Calendar(props) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  let monthArray = calendar.constructCalendarArray(year, monthIndex);

  let weeksTable = generateWeeksTable(monthArray);

  function handleLastMonthBtn(e) {
    const { newYear, newMonthIndex } = calendar.lastMonth(year, monthIndex);
    setYear(newYear);
    setMonthIndex(newMonthIndex);
  }

  function handleNextMonthBtn(e) {
    const { newYear, newMonthIndex } = calendar.nextMonth(year, monthIndex);
    setYear(newYear);
    setMonthIndex(newMonthIndex);
  }

  return (
    <div className="Calendar">
      <div className={"dateChoiceContainer"}>
        <button onClick={handleLastMonthBtn}>Last Month</button>
        <p>{formatDateMonth(year, monthIndex)}</p>
        <button onClick={handleNextMonthBtn}>Next Month</button>
      </div>
      <table className="calendarTable">
        <tbody>{weeksTable}</tbody>
      </table>
    </div>
  );
}

function generateWeeksTable(monthArray) {
  //Generate weeks
  let weeks = [];
  for (let i = 0; i < 6; i++) {
    let week = monthArray.slice(i * 7, (i + 1) * 7).map((day) => {
      return (
        <Day
          currentMonth={day.currentMonth}
          weekend={day.weekend}
          day={day.day}
          key={uniqid()}
        />
      );
    });
    weeks.push(week);
  }

  // Wrap weeks in a table
  let weeksTable = weeks.map((week) => {
    return <tr key={uniqid()}>{week}</tr>;
  });

  return weeksTable;
}

export default Calendar;