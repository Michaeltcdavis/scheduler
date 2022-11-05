import React from 'react';
import './styles.scss';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const STATUS = "STATUS";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE &&
        <Form
        interviewers={props.interviewers}
        onSave={() => transition(STATUS)}
        onCancel={() => back(EMPTY)}
        />}
      </article>
      );
};
