import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">CodeLab</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-link">Explore</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Create</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
