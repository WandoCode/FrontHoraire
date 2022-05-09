import beforeImg from "../static/img/before.svg";
import nextImg from "../static/img/next.svg";
import { calendar } from "../helpers/calendar";
import { getMonthText } from "../helpers/date";

function MonthChoice(props) {
  const year = props.year;
  const monthIndex = props.monthIndex;

  function handleLastMonthClick() {
    const { newYear, newMonthIndex } = calendar.lastMonth(year, monthIndex);
    props.changeMonth({ newYear, newMonthIndex });
  }

  function handleNextMonthClick() {
    const { newYear, newMonthIndex } = calendar.nextMonth(year, monthIndex);
    props.changeMonth({ newYear, newMonthIndex });
  }

  return (
    <div className="MonthChoice">
      <img src={beforeImg} alt="before arrow" onClick={handleLastMonthClick} />
      <h2>{getMonthText(year, monthIndex)}</h2>
      <img src={nextImg} alt="next arrow" onClick={handleNextMonthClick} />
    </div>
  );
}

export default MonthChoice;