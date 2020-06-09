import React from 'react';
import './color-card.scss';
import { useMediaQuery } from 'react-responsive';
import ColorChip from './../color-chip/color-chip';
import LabelChip from './../label-chip/label-chip';
import Button from './../button/button';

const ColorCard = (props) => {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 530px)'
  });
  const colorObj = props.color;
  const colorType = (colorObj.isExact ? 'Exact color' : 'Closest color');

  return (
    <article className="color-card">
      <div className="color-card__top">
        <ColorChip colorHex={colorObj.requested} colorName={colorObj.name} colorNameType={colorType} />
        {!isMobile && <Button />}
      </div>

      <div className={`color-card__bottom ${isMobile && 'mb-28'}`}>
        <LabelChip label={'RGB'} value={`rgb(${colorObj.rgb})`} />
        <LabelChip label={'CSS'} value={`--color-${colorObj.variable}: ${colorObj.requested}`} />
        <LabelChip label={'SCSS'} value={`$color-${colorObj.variable}: ${colorObj.requested}`} />
      </div>

      {isMobile && <Button isWide={true} />}
    </article>
  )
}

export default ColorCard
