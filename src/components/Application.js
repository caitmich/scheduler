import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// Application component:
export default function Application(props) {
const {
  state, 
  setDay, 
  bookInterview, 
  cancelInterview
} = useApplicationData();
  
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map((appointment) => {
    return (
      <Appointment 
      // {...appointment}
      key={appointment.id}
      time={appointment.time}
      id={appointment.id}
      interview={getInterview(state, appointment.interview)}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
      );
  });

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
