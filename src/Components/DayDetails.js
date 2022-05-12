import { useNavigate, useParams } from "react-router-dom";
import { getDateStringLocal } from "../helpers/date";
import ScheduleChoice from "./ScheduleChoice";
import WorktimeChoice from "./WorktimeChoice";
import { calendar } from "../helpers/calendar";

// TODO Add a button to go back to calendar AT THE SAME MONTH THAN THE MONTH OF THIS PAGE
function DayDetails() {
  const { year, monthIndex, day } = useParams();

  const navigate = useNavigate();

  const handleNextDay = () => {
    const { newYear, newMonthIndex, newDay } = nextDay(
      parseInt(year),
      parseInt(monthIndex),
      parseInt(day)
    );
    navigate(`/day/details/${newYear}/${newMonthIndex}/${newDay}`);
  };

  const handlePrecDay = () => {
    const { newYear, newMonthIndex, newDay } = precDay(
      parseInt(year),
      parseInt(monthIndex),
      parseInt(day)
    );
    navigate(`/day/details/${newYear}/${newMonthIndex}/${newDay}`);
  };

  return (
    <div className="DayDetails">
      <div className="btnsContainer">
        <button onClick={handlePrecDay}>Avant</button>
        <h2>{getDateStringLocal(year, monthIndex, day)}</h2>
        <button onClick={handleNextDay}>Après</button>
      </div>
      <div className="formContainer">
        <ScheduleChoice year={year} monthIndex={monthIndex} day={day} />
        <WorktimeChoice year={year} monthIndex={monthIndex} day={day} />
      </div>
    </div>
  );
}

const nextDay = (year, monthIndex, day) => {
  // Return the parsed date of the day after the given date
  const nbrDayInMonth = calendar.getNbrDaysInMonth(year, monthIndex);

  let newDay = day + 1;
  let newMonthIndex = monthIndex;
  let newYear = year;

  if (newDay > nbrDayInMonth) {
    newDay = 1;
    newMonthIndex += 1;
  }
  if (newMonthIndex >= 12) {
    newMonthIndex = 0;
    newYear += 1;
  }
  return { newYear, newMonthIndex, newDay };
};

const precDay = (year, monthIndex, day) => {
  // Return the parsed date of the day before the given date
  let newDay = day - 1;
  let newMonthIndex = monthIndex;
  let newYear = year;
  if (newDay < 1) {
    newMonthIndex -= 1;
    newDay = calendar.getNbrDaysInMonth(year, newMonthIndex);
  }
  if (newMonthIndex <= -1) {
    newMonthIndex = 11;
    newYear = year - 1;
  }
  return { newYear, newMonthIndex, newDay };
};

export default DayDetails;

// TODO: Styliser le h2 horaire
// TODO: Préciser qu'à droite il s'agit des horaires et surtout qu'à gause il s'agit du temps de travail
// TODO Ajouter une confirmation de succés ou d'erreur à l'envoi d'un formulaire