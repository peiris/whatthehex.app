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
  if (props.isSmall) {
    className += ` button--sm`;
  }
  if (props.isExtraSmall) {
    className += ` button--xs`;
  }
  if (props.isPrimary) {
    className += ` button--primary`;
  }
  if (props.isReadOnly) {
    className += ` button--read-only`;
  }
  if (props.isPin) {
    className += ` button--pin`;
  }
  if (props.isIconOnly) {
    className += ` button--icon-only`;
  }

  const switchIconToFillIcon = () => {
    if (icon && props.isHover !== false) {
      let fillIcon = icon.replace("line", "fill");
      setIcon(fillIcon);
    }
  }

  const switchIconToLineIcon = () => {
    if (icon && props.isHover !== false) {
      let lineIcon = icon.replace("fill", "line");
      setIcon(lineIcon);
    }
  }

  return (
    <button
      onMouseEnter={switchIconToFillIcon}
      onMouseLeave={switchIconToLineIcon}
      onClick={props.onClick}
      className={className}
      style={props.style}
    >
      {props.iconComponent && props.iconComponent}
      {props.icon && <i className={`button__icon ${icon}`}></i>}
      {props.text && <span className="button__text">{props.text}</span>}
    </button>
  )
}

export default Button
