import React from 'react';
import './button.scss';
import { ReactComponent as CopyIcon } from './../../assets/icons/copy.svg';

function Button(props) {
  return (
    <button className={`button ${props.isWide && 'button__wide'}`}>
      <CopyIcon />
      <span className="button__text">Generate Shades</span>
    </button>
  )
}

export default Button
