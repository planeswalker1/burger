import React, {Component} from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((ingredient, index) => {
        return (
          <li key={ingredient + index}>
            <span style={{'textTransform': 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
          </li>
        );
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Delicious burger with the following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType='danger'
          click={this.props.purchaseCancelHandler}>CANCEL</Button>
        <Button
          btnType='success'
          click={this.props.purchaseContinueHandler}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;