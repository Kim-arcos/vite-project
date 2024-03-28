import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link">Shop</Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link">View Account</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;