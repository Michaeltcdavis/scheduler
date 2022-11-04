export function getAppointmentsForDay(state, day) {
  const appointArray = [];
  for (let item of state.days) {
    if (item.name === day) {
      for (let appoint of item.appointments) {
        for (let obj in state.appointments) {
          if (state.appointments[obj].id === appoint) {
            appointArray.push(state.appointments[obj]);
          }
        }
      }
      continue;
    }
  }
  return appointArray;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = interview.interviewer;
  return {...interview, interviewer: state.interviewers[interviewer]};
}