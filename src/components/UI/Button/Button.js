import React from 'react';

import classes from './Button.module.css';

const button = props => (
  <button
    onClick={props.click}
    className={[classes.button, classes['button--' + props.btnType]].join(' ')}>{props.children}</button>
);

export default button;