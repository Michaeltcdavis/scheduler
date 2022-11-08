import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function countSpots(day) {
    const appointArray = day.appointments;
    console.log('appointArray', appointArray);
    let count = 0;
    for (let appoint of appointArray) {
      console.log(state.appointments[appoint]);
      if (!state.appointments[appoint].interview)
        count++;
    }
    return count;
  }

  function findDayOfAppointment(appointId) {
    for (let day of state.days) {
      console.log(day);
      console.log(appointId)
      if (day.appointments.includes(appointId)) {
        console.log('dayObj: ', day);
        return { ...day };
      }
    }
    return -1;
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const appointmentDay = findDayOfAppointment(id);
        const spots = countSpots(appointmentDay);
        const days = state.days.map((day) => {
          if (day.id === appointmentDay.id) {
            day.spots = spots - 1;
          }
          return day;
        })
        const appointment = { ...state.appointments[id], interview: { ...interview } };
        const appointments = { ...state.appointments, [id]: appointment };
        return setState(prev => ({ ...prev, appointments, days }));
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const appointmentDay = findDayOfAppointment(id);
        const spots = countSpots(appointmentDay);
        const days = state.days.map((day) => {
          if (day.id === appointmentDay.id) {
            day.spots = spots+1;
          }
          return day;
        })
        const appointment = { ...state.appointments[id], interview: null }
        const appointments = { ...state.appointments, [id]: appointment }
        setState(prev => ({ ...prev, appointments, days }))
      })
  }

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
  
  return {state, setDay, bookInterview, cancelInterview}
}