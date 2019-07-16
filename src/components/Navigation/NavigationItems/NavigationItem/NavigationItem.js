import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = props => (
  <li className={classes.nav__item}>
    <NavLink
      to={props.link}
      exact={props.exact}
      className={classes.nav__link}
      activeClassName={classes['nav__link--active']}
      onClick={props.sideDrawerCloseHandler} >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;