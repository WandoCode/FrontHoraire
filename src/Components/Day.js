import { useNavigate } from "react-router-dom";

const HOST = require("../globalVars.json").HOST;

function Day(props) {
  const navigate = useNavigate();

  const classname = constructClass(props.currentMonth, props.weekend);

  function handleClick(e) {
    navigate(`/day/details/${props.year}/${props.monthIndex}/${props.day}`);
  }

  return (
    <td className={classname} onClick={handleClick}>
      {props.day}
    </td>
  );
}

const constructClass = (currentMonth, weekend) => {
  let classname = "Day";
  currentMonth ? (classname += " currentMonth") : (classname += " otherMonth");
  if (weekend) {
    classname += " weekend";
  }
  return classname;
};

export default Day;