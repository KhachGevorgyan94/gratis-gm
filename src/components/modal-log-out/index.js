import React, {Component} from 'react';

import './style.scss';
import './responsive.scss';
import Settings from "../../platform/serivces/settings";
import ButtonLoader from "../loader-button";



class ModalLogOut extends Component {

  state = {
  isLoading:false
  }
  submit = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('branch');
    window.location.reload()
  }

  render() {
    const {close} = this.props
    const {isLoading} = this.state
    return (
        <div className="L-delete-branch-modal-block">
          <div className="L-delete-branch">
            <h3>{Settings.translations.log_out_modal_text}</h3>
            <div className="G-select-btn-block G-flex G-align-center G-justify-end">
              <p onClick={close} className='G-cancel-btn'>{Settings.translations.cancel}</p>
              <ButtonLoader
                  buttonText={Settings.translations.log_out_text}
                  isLoading={isLoading}
                  onClick={this.submit}
                  classChange={'L-accept-btn'}
              />
            </div>
          </div>
        </div>
    );
  }
};

export default ModalLogOut;
