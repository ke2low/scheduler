
export function getInterview(state, interview) {
  if (interview === undefined || interview === null) {
    return null;
  } else {
    let newData = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return newData;
  }
}

export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  const filteredDays = state.days.filter(dayOfWeek => dayOfWeek.name === day);
  if (!filteredDays[0]) {
    return appointmentsForDay;
  } else if (filteredDays[0] !== undefined) {
    for (let element of filteredDays[0].appointments) {
      appointmentsForDay.push(state.appointments[element]);
    }
  }
  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  const interviewsForDay = []
  const filteredDays = state.days.filter(dayOfWeek => dayOfWeek.name === day);
  // console.log(JSON.stringify(state))
  if (!filteredDays[0]) {
    return interviewsForDay;
  } else if (filteredDays[0] !== undefined) {
    for (let element of filteredDays[0].interviewers) {
      interviewsForDay.push(state.interviewers[element]);
    }
  }
  return interviewsForDay;
}


