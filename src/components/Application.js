import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
// import { action } from "@storybook/addon-actions/dist/preview";
import DayList from "./DayList";
import Appointment from "./Appointment";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm"
//   },
//   {
//     id: 4,
//     time: "10am",
//     interview: {
//       student: "Caitlin Henry",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//   }
//   },
//   {
//     id: 5,
//     time:"2pm"
//   }

// ];

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  //to set state after merging all useState into one variable above
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));

  // const appointmentsArray = Object.values(appointments);
  const parsedAppointments = dailyAppointments.map((appointment) => 
  <Appointment key={appointment.id}
  {...appointment}
  />)

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, first:all[0], second:all[1], third:all[2]}));

    })
  }, [])

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
          {parsedAppointments}
          <Appointment key="last" time="5pm" />
        
      </section>
    </main>
  );
}
