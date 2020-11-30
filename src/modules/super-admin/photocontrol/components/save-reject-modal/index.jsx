import React, {Component} from 'react';
import './style.scss'
import Settings from "../../../../../platform/serivces/settings";
import {SaveRejectStatus} from "../photo-control-list/service";

class SaveRejectModal extends Component {


  render() {
    const {close, saveRejectStatus,updateStatus} = this.props
    return (
        <div className="P-save-reject-modal">

          <div className='P-save-reject-modal-block'>
            <div className='P-save-reject-modal-title'>
              <h3>
                {saveRejectStatus === SaveRejectStatus.save ? Settings.translations.save_changes_modal : ''}
                {saveRejectStatus === SaveRejectStatus.reject ? Settings.translations.rejected_text_modal : ''}
                {saveRejectStatus === SaveRejectStatus.verification ? Settings.translations.verification_text_modal : ''}
              </h3>
            </div>
            <div className='P-save-reject-buttons'>
              <p onClick={close}>{Settings.translations.cancel}</p>
              <div className={`P-save-reject-btn G-btn ${saveRejectStatus === SaveRejectStatus.reject? 'P-reject-btn':''}`}>
                <button onClick={updateStatus}>
                  {saveRejectStatus === SaveRejectStatus.save ? Settings.translations.save_changes : ''}
                  {saveRejectStatus === SaveRejectStatus.reject ? Settings.translations.reject_verify_text : ''}
                  {saveRejectStatus === SaveRejectStatus.verification ? Settings.translations.accept_verification : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default SaveRejectModal;
