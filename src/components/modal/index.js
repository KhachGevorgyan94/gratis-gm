import React from 'react';
import ReactDOM from 'react-dom';

import ClickOutside from '../click-outside';

import './style.scss';

class Modal extends React.Component {

  render() {
    const { isOpen, close, changeClass } = this.props;
    return isOpen ? ReactDOM.createPortal(
      <div className={`E-modal-wrap`} >
        <ClickOutside onClickOutside={close}>
          <div className={`E-modal-content ${changeClass} `}>
            {this.props.children}
          </div>
        </ClickOutside>
      </div>, document.getElementById('modal')
    ) : null;
  }
}

export default Modal;
