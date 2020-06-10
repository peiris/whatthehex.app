import React, { useContext, useRef } from 'react';
import { SketchPicker } from 'react-color';
import './search-input.scss';
import { ReactComponent as EnterIcon } from './../../assets/icons/enter.svg';
import { Context } from '../../store';
import { generateColorDetails } from './../../functions/what-the-hex';

const SearchInput = (props) => {
  const inputEl = useRef(null);
  const [state, dispatch] = useContext(Context);

  const handleChangeComplete = (color) => {
    dispatch({ type: 'SET_SELECTED_COLOR', payload: color.hex });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(inputEl.current.value) });
  };

  const _onFormSubmit = e => {
    e.preventDefault();
    e.persist();
    dispatch({ type: 'SET_SELECTED_COLOR', payload: inputEl.current.value });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(inputEl.current.value) });
  }

  const _onInputChange = value => {
    dispatch({ type: 'SET_SELECTED_COLOR', payload: value });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(inputEl.current.value) });
  }

  const _showPicker = () => {
    dispatch({ type: 'SET_PICKER_VISIBILITY', payload: true });
  }

  const _hidePicker = () => {
    dispatch({ type: 'SET_PICKER_VISIBILITY', payload: false });
    inputEl.current.focus();
  }

  return (
    <form onSubmit={_onFormSubmit} className={`search-input ${props.isHero ? 'search-input--hero' : ''}`}>
      <input
        type="text"
        className="form-control search-input__form-control"
        placeholder="Enter your hex colour code"
        value={state.selectedColor}
        ref={inputEl}
        onChange={e => _onInputChange(e.target.value)}
        onClick={_showPicker}
      />

      <button className="btn search-input__btn"><EnterIcon /></button>

      {state.isPickerVisible && (<div className="search-input--color-picker">
        <span className="search-input--overlay" onClick={_hidePicker}></span>
        <SketchPicker
          color={state.selectedColor}
          onChange={handleChangeComplete}
          disableAlpha={true}
        />
      </div>)
      }
    </form >
  );

}


export default SearchInput;