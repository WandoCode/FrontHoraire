import { useState, useEffect } from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleSelect from "./ScheduleSelect";
import UpdateSchedule from "./UpdateSchedule";

function ManageSchedule(props) {
  return (
    <div className="ManageSchedule">
      <ScheduleForm />
      <UpdateSchedule />
    </div>
  );
}

export default ManageSchedule;