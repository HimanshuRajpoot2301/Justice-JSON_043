import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <AllRoutes />
    </Router>
  );
};

export default App;
