import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabledInfo[control.type]}
      />
    ))}
    <button
      disabled={!props.purchaseAble}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default BuildControls;