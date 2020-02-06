import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/stats"> STATS</NavLink>
      </li>
      <li>
        <NavLink to="/about"> ABOUT </NavLink> 
      </li>
    </ul>
  )
}

export default NavLinks
