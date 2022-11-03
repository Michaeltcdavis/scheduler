import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  return props.days.map((day) => {
  return (
    <ul>
      <DayListItem
        key={day.id}
        spots={day.spots}
        name={day.name}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    </ul>
    )
  })
};
