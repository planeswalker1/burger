import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = props => (
  <li className={classes.nav__item}>
    <a
      href={props.link}
      className={[classes.nav__link, props.active ? classes['nav__link--active'] : null].join(' ')}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;