import React from 'react';
import './styles.scss';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  console.log('props1: ', props.interviewer, props.student);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const CANCELLING = "CANCELLING";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        console.log('promise returned');
        transition(SHOW, true);
      })
      .catch(e => console.log('bookInterview error: ', e.message));
  }

  function cancel() {
    transition(CANCELLING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY, true))
      .catch(e => console.log('cancel error, ', e.message));
  }

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === SHOW &&
        <Show
        interviewer={props.interview.interviewer}
        student={props.interview.student}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE &&
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />}
      
      {mode === SAVING && <Status message='Saving' />}

      {mode === CONFIRM &&
        <Confirm
          onCancel={() => back()}
          onConfirm={cancel}
          message="Cancel this interview?"
        />}
      
      {mode === CANCELLING && <Status message='Cancelling' />}

      {mode === EDIT &&
        <Form
        interviewer={props.interview.interviewer}
        student={props.interview.student}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />}
    </article>
      );
};
