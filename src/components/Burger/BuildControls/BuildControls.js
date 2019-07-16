import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = props => (
  <div className={classes['build-controls']}>
    <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
    {
      controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          add={() => props.ingredientAddHandler(control.type)}
          remove={() => props.ingredientRemoveHandler(control.type)}
          disabled={props.isIngredientButtonDisabledInfo[control.type]} />
      ))
    }
    <button
      className={classes['button--order']}
      disabled={!props.purchaseable}
      onClick={props.order}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;