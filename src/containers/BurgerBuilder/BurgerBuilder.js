import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }
  
  purchaseStateUpdate = (ingredients) => {
    const ingredientSum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((ingredientsSum, ingredientAmount) => {
        return ingredientsSum + ingredientAmount;
      }, 0);
    return ingredientSum > 0;
  }
  
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  
  purchaseStartHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  render () {
    let isIngredientButtonDisabledInfo = {
      ...this.props.ingredients
    };
    for (let ingredient in isIngredientButtonDisabledInfo) {
      isIngredientButtonDisabledInfo[ingredient] = isIngredientButtonDisabledInfo[ingredient] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAddHandler={this.props.onIngredientAdded}
            ingredientRemoveHandler={this.props.onIngredientRemoved}
            isIngredientButtonDisabledInfo={isIngredientButtonDisabledInfo}
            totalPrice={this.props.totalPrice}
            purchaseable={this.purchaseStateUpdate(this.props.ingredients)}
            order={this.purchaseStartHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalCloseHandler={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      return dispatch(actions.addIngredient(ingredientName));
    },
    onIngredientRemoved: (ingredientName) => {
      return dispatch(actions.removeIngredient(ingredientName));
    },
    onInitIngredients: () => {
      return dispatch(actions.initIngredients());
    },
    onInitPurchase: () => {
      return dispatch(actions.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      return dispatch(actions.setAuthRedirectPath(path));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));