import axios from "axios";
import uniqid from "uniqid";
import { useState, useEffect } from "react";
import { formatErrors } from "../helpers/helpers";

const HOST = require("../globalVars.json").HOST;

function ScheduleSelect(props) {
  const defaultVal = props.defVal;
  const [schedulesArray, setSchedulesArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectInput, setSelectInput] = useState(defaultVal || "default");
  const [warningsObj, setWarningsObj] = useState();

  useEffect(() => {
    /* Reset selected value when props.defVal in an upper comp change */
    setSelectInput(defaultVal || "default");
  }, [defaultVal]);

  // TODO: display errors on screen

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
      <div className="input-container">
        <label htmlFor="scheduleSelect">{props.labelText}</label>
        <select
          value={selectInput}
          onChange={(e) => handleInput(e)}
          name="scheduleSelect"
          id="scheduleSelect"
        >
          <option disabled={true} value="default">
            Sélectionner un horaire
          </option>
          {options}
        </select>
      </div>
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