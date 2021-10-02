export function getAppointmentsForDay(state, day) {
  //filter days obj to find where the name matches the provided day
  
    if(state.days.length === 0){
      return [];
    }

  const filteredDays = state.days.filter(days => days.name === day);

  if (filteredDays.length === 0){
    return []
  }
  
  const appointmentsArray = (filteredDays[0]['appointments'])
  const answerArr = []
  
  if(appointmentsArray.length === 0) {
    return [];
  }
  for(const id of appointmentsArray) {    
    answerArr.push(state.appointments[id]);
  } 
  return(answerArr)

}

export function getInterview(state, interview) {
  if(!interview){
    return null;
  }
    //find interviewer info from interviewer id
    const interviewerId = interview.interviewer
    const interviewerInfo = (state.interviewers[interviewerId])
    
    interview['interviewer'] = {id: interviewerInfo.id,
    name: interviewerInfo.name,
    avatar:interviewerInfo.avatar
    }
  return(interview)
};

export function getInterviewersForDay(state, day) {
  //filter days obj to find where the name matches the provided day
  
    if(state.days.length === 0){
      return [];
    }

  const filteredDays = state.days.filter(days => days.name === day);

  if (filteredDays.length === 0){
    return []
  }
  //get the arr of interviewers from the returned matching day object
  const interviewersArray = (filteredDays[0]['interviewers']);

  const answerArr = []
  
  if(interviewersArray.length === 0) {
    return [];
  }
  for(const interviewer of interviewersArray) {    
    answerArr.push(state.interviewers[interviewer]);
  } 
  return(answerArr)
};





