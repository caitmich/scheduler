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