import React from "react"
import DayListItem from "./DayListItem"

export default function DayList(props){
  //make the required data in the props object into an array that you can map over
  const daysArray = Object.values(props.days);

  const parsedDays = daysArray.map((day)=> <DayListItem key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}
    />)

  return(
    <ul>
      {parsedDays}
    </ul>
  )
}
