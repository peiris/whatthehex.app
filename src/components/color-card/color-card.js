import Button from 'components/button/button';
import ColorChip from 'components/color-chip/color-chip';
import LabelChip from 'components/label-chip/label-chip';
import { generateColorDetails } from 'functions/what-the-hex';
import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Context } from 'store';
import './color-card.scss';

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

  const saveColor = () => {
    let getLSsavedColors = state.savedColors;

    if (getLSsavedColors.filter(e => e.returned === state.selectedColorObj.returned).length < 1) {

      let updatedColorObject = { ...state.selectedColorObj, isSelected: true };
      dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: updatedColorObject });

      getLSsavedColors.push(state.selectedColorObj);
      dispatch({ type: 'SET_SAVED_COLORS', payload: getLSsavedColors });
      localStorage.setItem('savedColors', JSON.stringify(getLSsavedColors));
    }

    dispatch({ type: 'SET_SIDEBAR_VISIBILITY', payload: true });
  }

  return (
    <article className="color-card">
      <div className="color-card__top">
        <ColorChip colorHex={colorObj.requested} colorName={colorObj.name} colorNameType={colorType} />
        <div className="color-card__actions">
          {!isMobile && <Button icon={'ri-refresh-line'} style={{ marginRight: '8px' }} onClick={refreshColor} />}
          {!isMobile && !colorObj.isSelected && <Button icon={'ri-heart-add-line'} text={'Save'} onClick={saveColor} />}

          {!isMobile && colorObj.isSelected &&
            <Button
              icon={'ri-check-double-fill'}
              text={'Saved'}
              isReadOnly={true}
            />
          }
        </div>
      </div>

      <div className={`color-card__bottom ${isMobile && 'mb-28'}`}>
        <LabelChip label={'String'} value={`${colorObj.variable}`} />
        <LabelChip label={'RGB'} value={`rgb(${colorObj.rgb})`} />
        <LabelChip label={'CSS'} value={`--${colorObj.variable}: ${colorObj.requested}`} />
        <LabelChip label={'SCSS'} value={`$${colorObj.variable}: ${colorObj.requested}`} />
      </div>

      {isMobile &&
        <div className="color-card__bottom__actions">
          <Button icon={'ri-refresh-line'} style={{ marginRight: '8px' }} onClick={refreshColor} text={'Random'} />

          {!colorObj.isSelected && <Button icon={'ri-heart-add-line'} text={'Save'} onClick={saveColor} />}

          {colorObj.isSelected &&
            <Button
              icon={'ri-check-double-fill'}
              text={'Saved'}
              isReadOnly={true}
            />
          }
        </div>
      }
    </article>
  )
}

export default ColorCard
