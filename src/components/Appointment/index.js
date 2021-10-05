import React, {Fragment} from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


// appointment component:
export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    await props.bookInterview(props.id, interview);
    //transition to show mode once interview is booked
    transition(SHOW);
  };

  async function remove(id){
    await props.cancelInterview(props.id);
    transition(DELETING);
    transition(EMPTY);
  }


  return (
    <Fragment>
    <article className="appointment">  
    <Header time={props.time} id={props.id}/>

    {mode === EMPTY && <Empty
    onAdd={() => transition(CREATE)}
    />
    }
    {mode === SHOW && (<Show 
    student={props.interview.student} 
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    />
    )}
    {mode === CREATE && <Form 
    interviewers={props.interviewers}
    onCancel={() => back(EMPTY)}
    onSave = {save}
    />}
    {mode === SAVING && <Status message={"SAVING"}/>}
    {mode === DELETING && <Status message={"DELETING"}/>}

    {mode === CONFIRM && <Confirm 
    onCancel = {() => back(SHOW)} 
    onConfirm = {remove}/>}

    </article>
    </Fragment> 
  );
}

