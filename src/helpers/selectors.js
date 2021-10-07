export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((days) => days.name === day);
  if (filteredDays) {
    return filteredDays.appointments.map((id) => state.appointments[id]);
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  //find interviewer info from interviewer id
  const interviewerId = interview.interviewer;
  const interviewerInfo = state.interviewers[interviewerId];

  //spread in a new obj to avoid mutating the existing one
  const newInterview = {
    ...interview,
    interviewer: {
      id: interviewerInfo.id,
      name: interviewerInfo.name,
      avatar: interviewerInfo.avatar,
    },
  };
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((days) => days.name === day);

  if (filteredDays) {
    return filteredDays.interviewers.map((id) => state.interviewers[id]);
  } else {
    return [];
  }
}
