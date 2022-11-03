import React, { Fragmant } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <header>{props.time}</header>
      {props.interview ?
        <Show interviewer={props.interview.interviewer} student={props.interview.student} />
        : <Empty onAdd={props.onAdd} />
      }
    </article>
  );
};