import { useState, useEffect } from "react";

function Day(props) {
  const classname = constructClass(props.currentMonth, props.weekend);

  return <td className={classname}>{props.day}</td>;
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