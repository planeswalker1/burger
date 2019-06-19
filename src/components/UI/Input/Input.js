import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch(props.elementType) {
    case ('input'):
      inputElement = (
        <input
        className={classes.input}
        {...props.elementConfig}
        value={props.value} />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
        className={classes.input}
        {...props.elementConfig}
        value={props.value} />
      );
      break;
    default:
        inputElement = (
          <input
          className={classes.input}
          {...props.elementConfig}
          value={props.value} />
        );
  }

  return (
    <div className={classes['input-container']}>
      <label htmlFor="" className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  ) 
};

export default input;