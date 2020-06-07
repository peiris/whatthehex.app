import React from 'react';
import './color-chip.scss';

function ColorChip(props) {
  let colorHex = props.colorHex || '#000000';
  let colorName = props.colorName || 'black';
  let colorNameType = props.colorNameType || 'Exact name';

  return (
    <div className="color-chip">
      <span className="color-chip__preview" style={{ backgroundColor: colorHex }}></span>
      <div className="color-chip__data">
        <h2 className="color-chip__data__title">{colorName}</h2>
        <span className="color-chip__data__label">{colorNameType}</span>
      </div>
    </div>
  )
}

export default ColorChip;
