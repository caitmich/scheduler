import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

// Application component:

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  //to set state after merging all useState into one variable above
  const setDay = day => setState({...state, day});

  const parsedAppointments = dailyAppointments.map((appointment) => {
    // console.log("appointment", appointment)
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id}
      interview={interview}
      {...appointment}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      allInterviewers={{...state.interviewers}}
      />
      );
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function bookInterview(id, interview){
    //create a new appointment obj from the interview obj passed from onSave in form, and take appointments[id] to copy the appointment data at that id
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    // create a copy of the appointments obj and then replace the existing record at the given appointment id with the new appointment obj:
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put(`/api/appointments/${id}`, appointment);
  
      setState({...state, appointments})
  };


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered"/>
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {/* list all appointments */}
          {parsedAppointments}
        {/* last appointment of the day */}
          <Appointment key="last" time="5pm"/>
        
      </section>
    </main>
  );
}
