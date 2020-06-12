import React from 'react';
import { ReactComponent as HintIcon } from './../../assets/icons/hint.svg';
import './hint.scss';

const Hint = () => {
  return (
    <label className="hint">
      <HintIcon className="hint--icon" />
      <span className="hint--label">Type or pick a color and press enter</span>
    </label>
  );
}

export default Hint;