import ScheduleForm from "./ScheduleForm";
import UpdateSchedule from "./UpdateSchedule";

function ManageSchedule() {
  return (
    <div className="ManageSchedule split">
      <div className="left">
        <h2>Créer un horaire</h2>

        <ScheduleForm />
      </div>
      <div className="right">
        <h2>Modifier un horaire</h2>

        <UpdateSchedule />
      </div>
    </div>
  );
}

export default ManageSchedule;