import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg" style={{"backgroundColor": "#800000"}}>
        <Link to="/" className="navbar-brand">Homepage</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact-us" className="nav-link">Contact Us</Link>
          </li>
          <li className="navbar-item">
            <Link to="/log-in" className="nav-link">Admin User</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/log-out" className="nav-link">Log Out</Link>
          </li> */}
        </ul>
        </div>
      </nav>
    );
  }
}
