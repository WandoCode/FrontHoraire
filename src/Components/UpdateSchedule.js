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
      let rep2 = await axios.get(
        `${HOST}/users/get/worktime/${rep.data.datas.workTime}`
      );
      const WT = rep2.data.datas; // TODO: envoyer les infos de WT depuis la route /schedule/get/${selectValue} coté
      // serveur
      const schedule = {
        ...rep.data.datas,
        startDate: getTimeString(WT.startDate),
        endDate: getTimeString(WT.endDate),
        breakTime: WT.breakTime,
      };
      setScheduleDetails(schedule);
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

const getTimeString = (stringDate) => {
  const date = new Date(stringDate);
  let hour = `${date.getHours()}`;
  let min = `${date.getMinutes()}`;

  hour = hour.length !== 2 ? "0" + hour : hour;
  min = min.length !== 2 ? "0" + min : min;

  return `${hour}:${min}`;
};

export default UpdateSchedule;