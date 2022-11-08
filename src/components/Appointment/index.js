import React from 'react';
import './styles.scss';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const CANCELLING = "CANCELLING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
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
        transition(SHOW);
      })
      .catch(e => {
        console.log('bookInterview error: ', e.message);
        transition(ERROR_SAVE, true);
      });
  }

  function cancel() {
    transition(CANCELLING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => {
        console.log('cancel error, ', e.message);
        transition(ERROR_DELETE, true);
      });
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
        //onCancel={back}
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
      
      {mode === ERROR_SAVE && <Error message='There was an error saving your appointment' onClose={back} />}

      {mode === ERROR_DELETE && <Error message='There was an error deleting your appointment' onClose={back} />}
      
    </article>
      );
};
