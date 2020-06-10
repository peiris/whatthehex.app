import React, { useContext } from 'react';
import { Context } from '../../store';
import './hero-search.scss';
import { generateColorDetails } from './../../functions/what-the-hex';

import SearchInput from './../search-input/search-input';
import Hint from './../hint/hint';

const HeroSearch = () => {
  const [state, dispatch] = useContext(Context);

  const handleChange = (value) => {
    dispatch({ type: 'SET_SELECTED_COLOR', payload: value });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(value) });
  }

  return (
    <div className="hero-search">
      <SearchInput
        className="hero-search--input"
        isHero={true}
        selectedColor={state.selectedColor}
        onChange={handleChange}
      />
      <Hint className="hero-search--hint" />
    </div>
  )
}

export default HeroSearch;