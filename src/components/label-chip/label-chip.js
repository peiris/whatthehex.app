import React from 'react';
import './label-chip.scss';

function LabelChip(props) {
  let label = props.label || 'Label';
  let value = props.value || 'Value';

  return (
    <div className="label-chip">
      <label className="label-chip__label">{label}</label>
      <span className="label-chip__value">{value}</span>
    </div>
  )
}

export default LabelChip
