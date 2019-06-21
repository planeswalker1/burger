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
          value={props.value} 
          onChange={props.onChange} />
      );
      break;

    case ('textarea'):
      inputElement = (
        <textarea
          className={classes.input}
          {...props.elementConfig}
          value={props.value} 
          onChange={props.onChange} />
      );
      break;

    case ('select'):
      inputElement = (
        <select className={classes.input} value={props.value} onChange={props.onChange}>
          {props.elementConfig.options.map((option) => {
            return (
              <option
                key={option.value} 
                value={option.value}
              >{option.displayValue}</option>
            );
          })}
        </select>
      );
      break;
    default:
        inputElement = (
          <input
            className={classes.input}
            {...props.elementConfig}
            value={props.value} 
            onChange={props.onChange} />
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