import React from 'react';
import './logo-brand.scss';
import { ReactComponent as LogoType } from './../../assets/logos/wthlogotype.svg';
import { ReactComponent as Logo } from './../../assets/logos/wthlogo.svg';

const LogoBrand = () => {
  return (
    <section className="logo-brand">
      <Logo className="logo-brand--logo" />
      <LogoType />
    </section>
  );
}

export default LogoBrand;