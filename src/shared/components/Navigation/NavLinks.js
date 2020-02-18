import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/dart-scoring/stats"> STATS</NavLink>
      </li>
      <li>
        <NavLink to="/dart-scoring/about"> ABOUT </NavLink> 
      </li>
    </ul>
  )
}

export default NavLinks
