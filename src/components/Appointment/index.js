import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


/* <Appointment 
      key={appointment.id}
      interview={interview}
      {...appointment}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      allInterviewers={{...state.interviewers}}
      /> */

// appointment component:
export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("fetching appointment interviewer", props.interview)


  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };
    console.log("interviewer", interviewer)
    console.log("interview obj", interview);
    props.bookInterview(props.id, interview);
    //transition to show mode once interview is booked
    transition(SHOW);
  }

  // const interviewerName = props.interview.inter

  return (
    <Fragment>
    <article className="appointment">  
    <Header time={props.time} id={props.id}/>

    {mode === EMPTY && <Empty
    onAdd={() => transition(CREATE)}
    />
    }
    { mode === SHOW && (<Show 
    student={props.interview.student} 
    interviewer={props.interview.interviewer}
    />
    )}
    {mode === CREATE && <Form 
    interviewers={props.interviewers}
    onCancel={() => back(EMPTY)}
    onSave = {save}
    />}

    </article>
    </Fragment> 
  );
}

