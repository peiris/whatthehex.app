import Home from 'components/home/home';
import Navigation from 'components/navigation/navigation';
import Sidebar from 'components/sidebar/sidebar';
import React from "react";
import ReactGA from 'react-ga';
import Store from 'store';

ReactGA.initialize('UA-169340778-1');
ReactGA.pageview('/homepage');

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
