import Home from 'components/home/home';
import Navigation from 'components/navigation/navigation';
import Sidebar from 'components/sidebar/sidebar';
import React from "react";
import Store from 'store';

const App = () => {
  return (
    <Store>
      <Navigation />
      <Home />
      <Sidebar />
    </Store>
  );
}

export default App;
