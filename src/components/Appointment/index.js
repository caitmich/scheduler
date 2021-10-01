import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
// import values from "postcss-modules-values";

export default function Appointment(props){

  return (
    <Fragment>
    <article className="appointment">  
    <Header time={props.time} id={props.id}/>
    { (props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
    </article>
    </Fragment> 
  );
}

