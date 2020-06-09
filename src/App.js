import React, { useState, useEffect } from "react";
import { generateColorDetails } from './functions/what-the-hex';
import { useMediaQuery } from 'react-responsive';
import LogoBrand from './components/logo-brand/logo-brand';
import HeroSearch from './components/hero-search/hero-search';
import ColorCard from './components/color-card/color-card';

const App = () => {
  const [color, setColor] = useState({})
  const isMobile = useMediaQuery({
    query: '(max-device-width: 530px)'
  });

  useEffect(() => {
    getInitialColor();
  }, []);

  const getInitialColor = () => {
    let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    setColor(generateColorDetails(randomColor));
  };

  return (
    <div className={`wrapper ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <LogoBrand />
      <HeroSearch />
      <ColorCard color={color} />
    </div>
  );
}

export default App;
