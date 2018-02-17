import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigationitem.css';

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      activeClassName={classes.active}
      exact
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;