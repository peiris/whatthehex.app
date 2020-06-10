import React, { useContext } from 'react';
import './label-chip.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from '../../store';

function LabelChip(props) {
  const [state, dispatch] = useContext(Context);

  let label = props.label || 'Label';
  let value = props.value || 'Value';

  let className = `label-chip`;
  if (props.isLeftAlign) {
    className += ` label-chip--left-align`;
  }

  const setClipboard = (e) => {
    console.log(e);
    dispatch({ type: 'SET_IS_COPIED_TO_CLIPBOARD', payload: true });
  }

  return (
    <div className={className}>
      <label className="label-chip__label">{label}</label>

      <CopyToClipboard
        onCopy={setClipboard}>
        <span className="label-chip__value">{value}</span>
      </CopyToClipboard>
    </div>
  )
}

export default LabelChip
