import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes['checkout-summary']}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="danger"
        click={props.checkoutCancelled}>CANCEL</Button>
      <Button
        btnType="success"
        click={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
};

export default checkoutSummary;