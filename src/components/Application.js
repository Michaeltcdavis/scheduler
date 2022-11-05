
import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from "components/Appointment"

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        student={appointment.student}
        interview={interview}
        interviewers={interviewers}
      />
    )
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    let ignore = false;
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    return () => ignore = true;
  }, []); 

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

