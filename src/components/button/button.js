import React, { useState } from 'react';
import './button.scss';

function Button(props) {
  const [icon, setIcon] = useState(props.icon);

  let className = 'button';
  if (props.className) {
    className += ` ${props.className}`;
  }
  if (props.isWide) {
    className += ` button__wide`;
  }

  const switchIconToFillIcon = () => {
    let fillIcon = icon.replace("line", "fill");
    setIcon(fillIcon);
  }

  const switchIconToLineIcon = () => {
    let lineIcon = icon.replace("fill", "line");
    setIcon(lineIcon);
  }

  return (
    <button onMouseEnter={switchIconToFillIcon} onMouseLeave={switchIconToLineIcon} onClick={props.onClick} className={className} style={props.style}>
      {props.icon && <i className={`button__icon ${icon}`}></i>}
      {props.text && <span className="button__text">{props.text}</span>}
    </button>
  )
}

export default Button
