import React from 'react';
import './search-input.scss';
import { ReactComponent as EnterIcon } from './../../assets/icons/enter.svg';

const SearchInput = (props) => {
  return (
    <div className={`search-input ${props.isHero ? 'search-input--hero' : ''}`}>
      <input type="text" className="form-control search-input__form-control" placeholder="Enter your hex colour code" />
      <button className="btn search-input__btn"><EnterIcon /></button>
    </div>
  );
}

export default SearchInput;