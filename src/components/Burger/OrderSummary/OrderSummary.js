import React, { Component } from 'react';

import Auxs from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // Could be a functional component
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((ingredientKey, index) => (
      <li key={ingredientKey}><span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}</li>
    ));
    return (
      <Auxs>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Auxs>
    )
  }
}

export default OrderSummary;