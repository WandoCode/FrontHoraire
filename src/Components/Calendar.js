import { useState } from "react";
import { calendar, getMonthText } from "../helpers";
import Day from "./Day";
import uniqid from "uniqid";
import nextImg from "../static/img/next.svg";
import beforeImg from "../static/img/before.svg";

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  let monthArray = calendar.constructCalendarArray(year, monthIndex);

  let weeksTable = generateWeeksTable(monthArray);

  function handleLastMonthBtn() {
    const { newYear, newMonthIndex } = calendar.lastMonth(year, monthIndex);
    setYear(newYear);
    setMonthIndex(newMonthIndex);
  }

  function handleNextMonthBtn() {
    const { newYear, newMonthIndex } = calendar.nextMonth(year, monthIndex);
    setYear(newYear);
    setMonthIndex(newMonthIndex);
  }

  // TODO créer un composant pour le choix des mois
  return (
    <div className="Calendar">
      <div className={"dateChoiceContainer"}>
        <img src={beforeImg} alt="before arrow" onClick={handleLastMonthBtn} />
        <p>{getMonthText(year, monthIndex)}</p>
        <img src={nextImg} alt="next arrow" onClick={handleNextMonthBtn} />
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
          monthIndex={day.monthIndex}
          year={day.year}
          key={uniqid()}
        />
      );
    });
    weeks.push(week);
  }

  // TODO: Wrapping could be avoided with React.Fragment???
  // Wrap weeks in a table
  return weeks.map((week) => {
    return <tr key={uniqid()}>{week}</tr>;
  });
}

export default Calendar;