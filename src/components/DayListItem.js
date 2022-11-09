import React from "react";
import classNames from "classnames";
import './DayListItem.scss'


export default function DayListItem(props) {
  const formatSpots = function(spotsNo) {
    let spotsPhrase = ''
    if (spotsNo > 1) {
      spotsPhrase += `${spotsNo} spots`
    } 
    if (spotsNo === 1) {
      spotsPhrase += `${spotsNo} spot`
    }
    if (spotsNo < 1) {
      spotsPhrase += 'no spots'
    }
    spotsPhrase += ' remaining'
    return spotsPhrase;
  }
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots 
  })
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}