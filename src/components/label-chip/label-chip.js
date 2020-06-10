import React from 'react';
import './label-chip.scss';

function LabelChip(props) {
  let label = props.label || 'Label';
  let value = props.value || 'Value';

  let className = `label-chip`;
  if (props.isLeftAlign) {
    className += ` label-chip--left-align`;
  }

  return (
    <div className={className}>
      <label className="label-chip__label">{label}</label>
      <span className="label-chip__value">{value}</span>
    </div>
  )
}

export default LabelChip
