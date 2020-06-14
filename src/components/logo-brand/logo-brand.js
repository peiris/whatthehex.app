import { ReactComponent as Logo } from 'assets/logos/wthlogo.svg';
import { ReactComponent as LogoType } from 'assets/logos/wthlogotype.svg';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './logo-brand.scss';

const LogoBrand = () => {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
  });

  return (
    <section className="logo-brand">
      <Logo className="logo-brand--logo" width={240} height={isMobile ? 48 : 60} />
      <LogoType height={isMobile ? 20 : 28} />
    </section>
  );
}

export default LogoBrand;