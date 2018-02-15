import React, { Component } from 'react';

import Auxs from '../Auxs';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState(() => ({ showSideDrawer: false }))
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    return (
      <Auxs>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxs>
    )
  }
};

export default Layout;