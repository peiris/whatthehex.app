import React from 'react';
import './logo-brand.scss';
import { ReactComponent as LogoType } from './../../assets/logos/wthlogotype.svg';
import { ReactComponent as Logo } from './../../assets/logos/wthlogo.svg';
import { useMediaQuery } from 'react-responsive';

const LogoBrand = () => {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
  });

  return (
    <section className="logo-brand">
      <Logo className="logo-brand--logo" height={isMobile ? 48 : 60} />
      <LogoType height={isMobile ? 20 : 28} />
    </section>
  );
}

export default LogoBrand;