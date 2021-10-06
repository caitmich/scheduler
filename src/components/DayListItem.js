import React from "react";
import "components/DayListItem.scss"
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (props) => {
    return !props.spots ? <h3>no spots remaining</h3> : (
      props.spots === 1 ? <h3>1 spot remaining</h3> : <h3>{props.spots} spots remaining</h3>
    )

  }
    

  return (
    <li data-testid={props.name} className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      
    {formatSpots(props)}
      
    </li>
  );
}