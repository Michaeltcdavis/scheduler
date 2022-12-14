import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';

const InterviewerListItem = function(props) {
  const { avatar, name, setInterviewer, selected } = props;
  const itemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected
  })
  return (
    <li className={itemClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;