import React from 'react';
import LogoBrand from './components/logo-brand/logo-brand';
import HeroSearch from './components/hero-search/hero-search';
import ColorCard from './components/color-card/color-card';
import { useMediaQuery } from 'react-responsive';

const App = () => {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 530px)'
  });

  return (
    <div className={`wrapper ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      {isMobile && 'Mobile'}
      <LogoBrand />
      <HeroSearch />
      <ColorCard color={'#0D51FF'} />
    </div>
  );
}

export default App;
