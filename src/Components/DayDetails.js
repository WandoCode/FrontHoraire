import { useState, useEffect } from "react";
import { useContext } from "@types/react";
import { AuthContext } from "../AuthContextProvider";
import axios from "axios";
import { HOST } from "../globalVars.json";

async function DayDetails(props) {
  const { user } = useContext(AuthContext);
  try {
    const scheduleId = await getScheduleId(
      user._id,
      year, // TODO: Prendre les valeurs de year, monthIndex et day à partir de l'URL
      monthIndex, // TODO: Voir composant Day qui utilise un url de type: `/day/details/year/.monthIndex/.day`
      day // TODO: Pour rediriger vers la page de ce composant
    );

    if (!scheduleId) return;

    const schedule = await getSchedule(scheduleId);
  } catch (e) {
    console.error(e);
  }
  return <div className="DayDetails"></div>;
}

const getSchedule = async (scheduleId) => {
  console.log(scheduleId);
  let rep = await axios.get(`${HOST}/schedule/get/${scheduleId}`);
  return rep.data.datas;
};

const getScheduleId = async (userId, year, monthIndex, day) => {
  let rep = await axios.get(`${HOST}/users/get/${userId}`);
  return rep.data.datas.calendrier[year][monthIndex][day].schedule;
};

export default DayDetails;