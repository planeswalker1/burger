import React from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let sideDrawerClasses = [classes['side-drawer'], classes['side-drawer--close']];
  if (props.isSideDrawerOpen) {
    sideDrawerClasses = [classes['side-drawer'], classes['side-drawer--open']];
  }

  return (
    <Aux>
      <Backdrop
        click={props.sideDrawerCloseHandler}
        show={props.isSideDrawerOpen} />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <NavigationItems
          isAuthenticated={props.isAuth}
          sideDrawerCloseHandler={props.sideDrawerCloseHandler} />
      </div>
    </Aux>
  );
};

export default sideDrawer;