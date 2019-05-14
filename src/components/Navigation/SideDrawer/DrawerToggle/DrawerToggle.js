import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = props => (
  <div
    className={classes['drawer-toggle']}
    onClick={props.click}>
    <div className={classes['drawer-toggle__line']}></div>
    <div className={classes['drawer-toggle__line']}></div>
    <div className={classes['drawer-toggle__line']}></div>
  </div>
);

export default drawerToggle;