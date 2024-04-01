import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Home } from './components';
import './components/Navbar/Navbar.scss';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App;

