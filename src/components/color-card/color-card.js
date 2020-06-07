import React from 'react';
import './color-card.scss';
import { useMediaQuery } from 'react-responsive';
import ColorChip from './../color-chip/color-chip';
import LabelChip from './../label-chip/label-chip';
import Button from './../button/button';

const ColorCard = (props) => {
  const hex = props.color;
  const isMobile = useMediaQuery({
    query: '(max-device-width: 530px)'
  })

  return (
    <article className="color-card">
      <div className="color-card__top">
        <ColorChip colorHex={hex} colorName={'Clear Blue'} colorNameType={'Closest name'} />
        {!isMobile && <Button />}
      </div>

      <div className={`color-card__bottom ${isMobile && 'mb-28'}`}>
        <LabelChip label={'RGBA'} value={'rgba(77, 81, 101, 1)'} />
        <LabelChip label={'CSS'} value={'--color-clear-blue: #227BFE'} />
        <LabelChip label={'SCSS'} value={'$color-clear-blue: #227BFE'} />
      </div>

      {isMobile && <Button isWide={true} />}
    </article>
  )
}

export default ColorCard
