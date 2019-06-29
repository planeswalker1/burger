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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    console.log(this.props);
    // axios.get('https://burger-151e6.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       ingredients: res.data
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       error: true
    //     });
    //   });
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
    this.props.history.push('/checkout');
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

  render () {
    let isIngredientButtonDisabledInfo = {
      ...this.props.ingredients
    };
    for (let ingredient in isIngredientButtonDisabledInfo) {
      isIngredientButtonDisabledInfo[ingredient] = isIngredientButtonDisabledInfo[ingredient] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
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

const mapStateToProps = (state) => {
  return {
     ingredients: state.ingredients,
     totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      return dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName});
    },
    onIngredientRemoved: (ingredientName) => {
      return dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));