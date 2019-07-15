import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';

const toolbar = props => (
  <header className={classes.toolbar}>
    <DrawerToggle click={props.sideDrawerToggleHandler}/>
    <div className={classes.logo}>
      <Logo />
    </div>
    <div className={classes['desktop-only']}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </div>
  </header>
)

export default toolbar;