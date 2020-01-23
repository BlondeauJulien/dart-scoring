import React from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks'

import './MainNavigation.css';

const MainNavigation = props => {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">DARTS 501 SCORING</h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  )
}

export default MainNavigation
