import { calendar } from "../helpers";
import Day from "./Day";
import uniqid from "uniqid";

function Calendar(props) {
  let year = 2022;
  let monthIndex = 4;
  let monthArray = calendar.constructCalendarArray(year, monthIndex);

  let weeksTable = generateWeeksTable(monthArray);

  return (
    <div className="Calendar">
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
    let week = monthArray.slice(i * 7, (i + 1) * 7 - 1).map((day) => {
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
    return <tr>{week}</tr>;
  });

  return weeksTable;
}

export default Calendar;