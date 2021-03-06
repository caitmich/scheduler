import React from "react"
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

function InterviewerList(props){

  //get an arr containing each of interviewer objects from the interviewer obj in props
  const interviewersArray = Object.values(props.interviewers);

  const parsedInterviewers = interviewersArray.map((interviewer) => 
  <InterviewerListItem key={interviewer.id}

    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={(event) => props.onChange(interviewer.id)}
  />)

  return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{parsedInterviewers}</ul>
</section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
