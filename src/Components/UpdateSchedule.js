import { useState, useEffect } from "react";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";
import ScheduleForm from "./ScheduleForm";
import { formatErrors } from "../helpers/helpers";

const HOST = require("../globalVars.json").HOST;

function UpdateSchedule() {
  const [selectValue, setSelectValue] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [warningsObj, setWarningsObj] = useState();

  useEffect(() => {
    if (warningsObj) console.error(warningsObj);
  }, [warningsObj]);

  useEffect(() => {
    const getScheduleDetails = async () => {
      try {
        let rep = await axios.get(`${HOST}/schedule/get/${selectValue}`);

        setScheduleDetails(rep.data.data);
      } catch (e) {
        const errorObject = formatErrors(e.response.data);
        setWarningsObj(errorObject);
      }
    };

    if (selectValue !== "") {
      getScheduleDetails();
    }
  }, [selectValue]);

  useEffect(() => {}, [scheduleDetails]);

  const getValue = (val) => {
    setSelectValue(val);
  };

  return (
    <div className="UpdateSchedule">
      <ScheduleSelect
        labelText={"Choisir un horaire"}
        getValue={getValue}
        defVal={selectValue}
      />
      <ScheduleForm
        name={scheduleDetails.name}
        startDate={scheduleDetails.startDate}
        endDate={scheduleDetails.endDate}
        breakTime={scheduleDetails.breakTime}
        scheduleId={scheduleDetails._id}
        update={true}
      />
    </div>
  );
}

export default UpdateSchedule;