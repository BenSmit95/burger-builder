import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
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

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Layout);