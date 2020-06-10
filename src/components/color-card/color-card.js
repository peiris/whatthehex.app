import React, { useContext } from 'react';
import './color-card.scss';
import { useMediaQuery } from 'react-responsive';
import ColorChip from './../color-chip/color-chip';
import LabelChip from './../label-chip/label-chip';
import Button from './../button/button';
import { Context } from '../../store';
import { generateColorDetails } from './../../functions/what-the-hex';

const ColorCard = (props) => {
  const [state, dispatch] = useContext(Context);

  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
  });
  
  const colorObj = state.selectedColorObj;
  const colorType = (colorObj.isExact ? 'Exact color' : 'Closest color');

  const refreshColor = () => {
    let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    dispatch({ type: 'SET_SELECTED_COLOR', payload: randomColor });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(randomColor) });
  }

  return (
    <article className="color-card">
      <div className="color-card__top">
        <ColorChip colorHex={colorObj.requested} colorName={colorObj.name} colorNameType={colorType} />
        <div className="color-card__actions">
          {!isMobile && <Button icon={'ri-refresh-line'} style={{ marginRight: '8px' }} onClick={refreshColor} />}
          {!isMobile && <Button icon={'ri-heart-add-line'} text={'Save'} />}
        </div>
      </div>

      <div className={`color-card__bottom ${isMobile && 'mb-28'}`}>
        <LabelChip label={'RGB'} value={`rgb(${colorObj.rgb})`} />
        <LabelChip label={'CSS'} value={`--color-${colorObj.variable}: ${colorObj.requested}`} />
        <LabelChip label={'SCSS'} value={`$color-${colorObj.variable}: ${colorObj.requested}`} />
      </div>

      {isMobile &&
        <div className="color-card__bottom__actions">
          <Button icon={'ri-refresh-line'} style={{ marginRight: '8px' }} onClick={refreshColor} text={'Random'} />
          <Button icon={'ri-heart-add-line'} text={'Save'} />
        </div>
      }
    </article>
  )
}

export default ColorCard
