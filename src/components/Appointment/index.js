import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// appointment component:
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        console.log("error");
        transition(SHOW);
      })
      .catch((error) => {
        console.log("error catch", error);
        transition(ERROR_SAVE, true);
      });
  }

  function remove(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} id={props.id} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={"SAVING"} />}
        {mode === DELETING && <Status message={"DELETING"} />}

        {mode === CONFIRM && (
          <Confirm onCancel={() => back(SHOW)} onConfirm={remove} />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={() => transition(SHOW)}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
        <Error message="Could not Save Appointment" onClose={back}/>
        )}
        {mode === ERROR_DELETE && (
        <Error message="Could not Delete Appointment" onClose={back}/>
          )}
        
      </article>
    </Fragment>
  );
}
