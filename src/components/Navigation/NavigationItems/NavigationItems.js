import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <nav className={classes.nav}>
    <ul className={classes.nav__items}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      <NavigationItem link='/auth'>Authenticate</NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;