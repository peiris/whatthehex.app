import React from 'react';
import './navigation.scss';

const Navigation = () => {
  return (
    <nav className={'navigation'}>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Credits</a></li>
        <li><a href="#">Roadmap</a></li>
      </ul>
    </nav>
  )
}

export default Navigation
