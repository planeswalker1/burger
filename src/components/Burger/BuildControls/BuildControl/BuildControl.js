import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = props => (
  <div className={classes['build-control']}>
    <div className={classes.label}>
      {props.label}
    </div>
    <button
      className={[classes['button'], classes['button--less']].join(' ')}
      onClick={props.remove}
      disabled={props.disabled}>
        Less
    </button>
    <button
      className={[classes['button'], classes['button--more']].join(' ')}
      onClick={props.add}>
      More
    </button>
  </div>
);

export default buildControl;