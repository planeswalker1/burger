import React, {Component} from 'react';

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
          isSideDrawerOpen={this.state.isSideDrawerOpen}/>
        <Toolbar
          sideDrawerToggleHandler={this.sideDrawerToggleHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;