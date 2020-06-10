import React from 'react';
import './button.scss';

function Button(props) {
  let className = 'button';
  if (props.className) {
    className += ` ${props.className}`;
  }
  if (props.isWide) {
    className += ` button__wide`;
  }

  return (
    <button onClick={props.onClick} className={className} style={props.style}>
      {props.icon && <i className={`button__icon ${props.icon}`}></i>}
      {props.text && <span className="button__text">{props.text}</span>}
    </button>
  )
}

export default Button
