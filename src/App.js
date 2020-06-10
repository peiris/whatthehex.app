import React from "react";
import Store from './store';
import Home from './components/home/home';
import Navigation from './components/navigation/navigation';

const App = () => {
  return (
    <Store>
      <Navigation />
      <Home />
    </Store>
  );
}

export default App;
