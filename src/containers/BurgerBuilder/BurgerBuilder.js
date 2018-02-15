import React, { Component } from 'react';

import Auxs from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseAble: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-2b645.firebaseio.com/ingredients.json').then(response => {
      this.setState({ ingredients: response.data })
    }).catch((error) => {
      this.setState({ error: true })
    })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map((key) => (ingredients[key])).reduce((sum, element) => (sum + element), 0);

    this.setState({ purchaseAble: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    // alert('You continue!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ben',
        address: {
          street: 'Bestevearweg 2',
          zipCode: '123123',
          country: 'Nederland'
        },
        email: 'benjismit@live.nl'
      },
      deliveryMethod: 'fastest',
    }
    axios.post('/orders.json', order).then((response) => {
      this.setState({ loading: false, purchasing: false });
    }).catch((error) => {
      this.setState({ loading: false, purchasing: false });
    })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxs>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            disabledInfo={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchaseAble={this.state.purchaseAble}
            ordered={this.purchaseHandler}
          />
        </Auxs>
      )
      orderSummary = (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      )  
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxs>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxs>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);