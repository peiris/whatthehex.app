import React, { useState, useEffect, useContext } from "react";
import Store from './store';
import Home from './components/home/home';

const App = () => {
  return (
    <Store>
      <Home />
    </Store>
  );
}

export default App;
