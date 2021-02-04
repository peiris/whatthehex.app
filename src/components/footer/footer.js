import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className="container">
        <span className="footer__love">
          Made with <i className="ri-heart-3-fill"></i> for colors by <a href="https://twitter.com/khpeiris">Peiris</a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
