import React, { useEffect, useContext } from "react";
import { generateColorDetails } from './../../functions/what-the-hex';
import { useMediaQuery } from 'react-responsive';
import { Context } from '../../store';

import LogoBrand from './../logo-brand/logo-brand';
import HeroSearch from './../hero-search/hero-search';
import ColorCard from './../color-card/color-card';
import './home.scss';
import Footer from './../footer/footer';

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
  });
  const isLegacyMobile = useMediaQuery({
    query: '(max-device-width: 320px)'
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

  let className = `home`;
  if (isMobile) {
    className += ` is-mobile`;
  }
  if (isLegacyMobile) {
    className += ` is-legacy-mobile`;
  }

  if (state.selectedColor) {
    return (
      <div className={className}>
        <LogoBrand />
        <HeroSearch onChange={handleChange} />
        <ColorCard />
        <Footer />
      </div>
    )
  }

  return false;
}

export default Home
