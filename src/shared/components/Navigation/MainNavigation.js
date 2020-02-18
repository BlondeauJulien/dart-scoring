import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks'

import './MainNavigation.css';

const MainNavigation = () => {
  return (
    <MainHeader>
      <h1 className="main-navigation__title"><Link to="/dart-scoring/">DARTS 501</Link></h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  )
}

export default MainNavigation
