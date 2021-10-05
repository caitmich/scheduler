import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const handleChange = (event) => {
    setName(event.target.value)
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
    }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = (name, interviewer) => {
    props.onSave(name, interviewer);
    console.log(name, interviewer);
  }

  const studentName = () => {
    setName(props.name)
    setInterviewer(props.interviewer)
  }

  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">

    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder={"Enter Student Name"}
        value={name}
        onChange={(event) => handleChange(event)}
      />
    </form>

    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel}danger>Cancel</Button>
      <Button onClick={() => save(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>
  )
}