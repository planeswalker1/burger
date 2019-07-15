import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isSideDrawerOpen: false
  }
  sideDrawerCloseHandler = () => {
    this.setState({
      isSideDrawerOpen: false
    })
  }
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        isSideDrawerOpen: !prevState.isSideDrawerOpen
      };
    });
  }

  render () {
    return (
      <Aux>
        <SideDrawer
          sideDrawerCloseHandler={this.sideDrawerCloseHandler}
          isSideDrawerOpen={this.state.isSideDrawerOpen}
          isAuth={this.props.isAuthenticated} />
        <Toolbar
          sideDrawerToggleHandler={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);