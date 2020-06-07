import React from 'react';
import './hint.scss';
import { ReactComponent as HintIcon } from './../../assets/icons/hint.svg';

const Hint = () => {
  return (
    <label className="hint">
      <HintIcon className="hint--icon" />
      <span className="hint--label">Type or pick a colour code and press enter</span>
    </label>
  );
}

export default Hint;