import { useState, useEffect } from "react";
import ScheduleSelect from "./ScheduleSelect";
import axios from "axios";
import ScheduleForm from "./ScheduleForm";

const HOST = require("../globalVars.json").HOST;

function UpdateSchedule(props) {
  const [selectValue, setSelectValue] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState([]);

  useEffect(() => {
    const getScheduleDetails = async () => {
      let rep = await axios.get(`${HOST}/schedule/get/${selectValue}`);

      setScheduleDetails(rep.data.datas);
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
      <ScheduleSelect labelText={"Choose a schedule"} getValue={getValue} />
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