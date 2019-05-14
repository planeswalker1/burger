import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <nav className={classes.nav}>
    <ul className={classes.nav__items}>
      <NavigationItem link='/' active>Burger Builder</NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;