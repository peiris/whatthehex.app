import React from 'react';
import './hero-search.scss';
import SearchInput from './../search-input/search-input';
import Hint from './../hint/hint';

const HeroSearch = () => {
  return (
    <div className="hero-search">
      <SearchInput className="hero-search--input" isHero={true} />
      <Hint className="hero-search--hint" />
    </div>
  )
}

export default HeroSearch;