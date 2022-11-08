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

  

  function bookInterview(id, interview) {
    //console.log('bookInterview Params: ', id, interview);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const appointment = { ...state.appointments[id], interview: { ...interview } };
        const appointments = { ...state.appointments, [id]: appointment };
        return setState(prev => ({ ...prev, appointments }));
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const appointment = { ...state.appointments[id], interview: null }
        const appointments = { ...state.appointments, [id]: appointment }
        setState(prev => ({ ...prev, appointments }))
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