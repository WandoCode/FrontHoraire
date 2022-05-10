import { useState } from "react";
import Day from "./Day";
import uniqid from "uniqid";

import MonthChoice from "./MonthChoice";
import { calendar } from "../helpers/calendar";

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  let monthArray = calendar.constructCalendarArray(year, monthIndex);

  let weeksTable = generateWeeksTable(monthArray);

  function changeMonth({ newYear, newMonthIndex }) {
    setYear(newYear);
    setMonthIndex(newMonthIndex);
  }

  return (
    <div className="Calendar">
      <MonthChoice
        year={year}
        monthIndex={monthIndex}
        changeMonth={changeMonth}
      />
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
          monthIndex={day.monthIndex}
          year={day.year}
          key={uniqid()}
        />
      );
    });
    weeks.push(week);
  }

  // Wrap weeks in a table
  return weeks.map((week) => {
    return <tr key={uniqid()}>{week}</tr>;
  });
}

export default Calendar;