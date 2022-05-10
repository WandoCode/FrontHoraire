import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { formatErrors } from "../helpers/helpers";

const HOST = require("../globalVars.json").HOST;

function ScheduleSelect(props) {
  const defaultVal = props.defVal;
  const [schedulesArray, setSchedulesArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectInput, setSelectInput] = useState(defaultVal || "default");
  const [warningsObj, setWarningsObj] = useState();

  useEffect(() => {
    setSelectInput(defaultVal || "default");
  });

  // TODO: display errors on screen
  useEffect(() => {
    if (warningsObj) console.error(warningsObj);
  }, [warningsObj]);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        let rep = await axios.get(`${HOST}/schedule/all`);
        setSchedulesArray(rep.data.data);
      } catch (e) {
        const errorObject = formatErrors(e.response.data);
        setWarningsObj(errorObject);
      }
    };

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