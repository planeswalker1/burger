import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  let navigationLinkAuth = (
  <NavigationItem link='/auth'>Authenticate</NavigationItem>
  );
  if (props.isAuthenticated) {
    navigationLinkAuth = (
      <NavigationItem link='/logout'>Logout</NavigationItem>
    );
  }
  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__items}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {navigationLinkAuth}
      </ul>
    </nav>
  );
};

export default navigationItems;