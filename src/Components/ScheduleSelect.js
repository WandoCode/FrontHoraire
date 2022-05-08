import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";

const HOST = require("../globalVars.json").HOST;

function ScheduleSelect(props) {
  const [schedulesArray, setSchedulesArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectInput, setSelectInput] = useState(props.defVal || "default");
  const loadSchedules = async () => {
    let rep = await axios.get(`${HOST}/schedule/all`);
    setSchedulesArray(rep.data.datas);
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  useEffect(() => {
    setOptions(generateOptionsFromArray(schedulesArray));
  }, [schedulesArray]);

  const handleInput = (e) => {
    setSelectInput(e.target.value);
    props.getValue(e.target.value);
  };

  return (
    <div className="ScheduleSelect">
      <label htmlFor="scheduleSelect">{props.labelText}:</label>
      <select
        value={selectInput}
        onChange={(e) => handleInput(e)}
        name="scheduleSelect"
        id="scheduleSelect"
      >
        <option disabled={true} value="default">
          Select an option
        </option>
        {options}
      </select>
    </div>
  );
}

const generateOptionsFromArray = (dataArray) => {
  return dataArray.map((el) => {
    return (
      <option value={el._id} key={uniqid()}>
        {el.name}
      </option>
    );
  });
};
export default ScheduleSelect;