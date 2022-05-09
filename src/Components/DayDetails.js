import { useParams } from "react-router-dom";
import { getDateStringLocal } from "../helpers/date";
import ScheduleChoice from "./ScheduleChoice";
import WorktimeChoice from "./WorktimeChoice";

// TODO Add a button to go back to calendar AT THE SAME MONTH THAN THE MONTH OF THIS PAGE
// TODO 2 : Add a btn to go 1 day before or one day after without going back to calendar
function DayDetails() {
  const { year, monthIndex, day } = useParams();

  return (
    <div className="DayDetails">
      <h2>{getDateStringLocal(year, monthIndex, day)}</h2>
      <ScheduleChoice year={year} monthIndex={monthIndex} day={day} />
      <WorktimeChoice year={year} monthIndex={monthIndex} day={day} />
    </div>
  );
}

export default DayDetails;