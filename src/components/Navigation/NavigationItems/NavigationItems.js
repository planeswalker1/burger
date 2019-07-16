import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  let navigationLinkAuth = (
    <NavigationItem 
      link='/auth'
      sideDrawerCloseHandler={props.sideDrawerCloseHandler}>Authenticate</NavigationItem>
  );
  if (props.isAuthenticated) {
    navigationLinkAuth = (
      <React.Fragment>
        <NavigationItem
          link='/orders'
          sideDrawerCloseHandler={props.sideDrawerCloseHandler}>Orders</NavigationItem>
        <NavigationItem
          link='/logout'
          sideDrawerCloseHandler={props.sideDrawerCloseHandler}>Logout</NavigationItem>
      </React.Fragment>
    );
  }
  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__items}>
        <NavigationItem
          link='/'
          exact
          sideDrawerCloseHandler={props.sideDrawerCloseHandler}>Burger Builder</NavigationItem>
        {navigationLinkAuth}
      </ul>
    </nav>
  );
};

export default navigationItems;