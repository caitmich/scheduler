import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  async function bookInterview(id, interview) {
    //create a new appointment obj from the interview obj passed from onSave in form, and take appointments[id] to copy the appointment data at that id
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // create a copy of the appointments obj and then replace the existing record at the given appointment id with the new appointment obj:
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    await axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState((prev) => ({ ...prev, appointments })))
    .then(() => updateSpots(state.days, appointments))
    
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    await axios.delete(`/api/appointments/${id}`)
    .then(() => setState((prev) => ({ ...prev, appointments })))
    .then(() => updateSpots(state.days, appointments))
  }

  function updateSpots(days, appointments) {
    const today = days.findIndex((day) => day.name === state.day);
    const todayAppointments = days[today].appointments;
    const howMany = todayAppointments.map(
      appointment => appointments[appointment].interview
    );
    const num = howMany.filter((nulls) => nulls === null);
    const emptySpots = num.length;

    const newDay = {
      ...days[today],
      spots: emptySpots,
    };

    const newDays = [...days];
    newDays[today] = newDay;

    setState((prev) => ({ ...prev, days: newDays }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
