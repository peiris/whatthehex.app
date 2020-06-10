import React, { useEffect, useContext } from "react";
import { generateColorDetails } from './../../functions/what-the-hex';
import { useMediaQuery } from 'react-responsive';
import { Context } from '../../store';

import LogoBrand from './../logo-brand/logo-brand';
import HeroSearch from './../hero-search/hero-search';
import ColorCard from './../color-card/color-card';

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
  });

  useEffect(() => {
    getRandomColor();
  }, []);

  const getRandomColor = () => {
    let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    dispatch({ type: 'SET_SELECTED_COLOR', payload: randomColor });
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(randomColor) });
  };

  const handleChange = (value) => {
    dispatch({ type: 'SET_SELECTED_COLOR_OBJECT', payload: generateColorDetails(value) });
  }

  if (state.selectedColor) {
    return (
      <div className={`wrapper ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
        <LogoBrand />
        <HeroSearch onChange={handleChange} />
        <ColorCard />
      </div>
    )
  }

  return false;
}

export default Home
