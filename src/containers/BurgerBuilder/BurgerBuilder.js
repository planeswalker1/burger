import React, {Component} from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    console.log(this.props);
    axios.get('https://burger-151e6.firebaseio.com/ingredients.json')
      .then(res => {
        console.log(res);
        this.setState({
          ingredients: res.data
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  }
  purchaseStateUpdate = (ingredients) => {
    const ingredientSum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((ingredientsSum, ingredientAmount) => {
        return ingredientsSum + ingredientAmount;
      }, 0);
    this.setState({
      purchaseable: ingredientSum > 0
    });
  }
  
  purchaseContinueHandler = () => {
    // alert('You continue');
    console.log(this.props);
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  
  purchaseStartHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  ingredientAddHandler = (ingredientType) => {
    const oldIngredientCount = this.state.ingredients[ingredientType];
    const updatedIngredientCount = oldIngredientCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[ingredientType] = updatedIngredientCount;

    const ingredientPriceAddition = INGREDIENT_PRICES[ingredientType];
    const oldTotalPrice = this.state.totalPrice;
    const updatedTotalPrice = Number((oldTotalPrice + ingredientPriceAddition).toFixed(2));
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });
    this.purchaseStateUpdate(updatedIngredients);
  }

  ingredientRemoveHandler = (ingredientType) => {
    const oldIngredientCount = this.state.ingredients[ingredientType];
    if (oldIngredientCount <= 0) {
      return;
    }
    const updatedIngredientCount = oldIngredientCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[ingredientType] = updatedIngredientCount;

    const ingredientPriceDeduction = INGREDIENT_PRICES[ingredientType];
    const oldTotalPrice = this.state.totalPrice;
    const updatedTotalPrice = Number((oldTotalPrice - ingredientPriceDeduction).toFixed(2));
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });
    this.purchaseStateUpdate(updatedIngredients);
  }
  render () {
    let isIngredientButtonDisabledInfo = {
      ...this.state.ingredients
    };
    for (let ingredient in isIngredientButtonDisabledInfo) {
      isIngredientButtonDisabledInfo[ingredient] = isIngredientButtonDisabledInfo[ingredient] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAddHandler={this.ingredientAddHandler}
            ingredientRemoveHandler={this.ingredientRemoveHandler}
            isIngredientButtonDisabledInfo={isIngredientButtonDisabledInfo}
            totalPrice={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            order={this.purchaseStartHandler} />
        </Aux>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);