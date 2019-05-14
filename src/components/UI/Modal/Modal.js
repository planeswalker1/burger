import React,{Component} from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component {
  render () {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          click={this.props.modalCloseHandler}/>
        <div
          className={classes.modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
            {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;