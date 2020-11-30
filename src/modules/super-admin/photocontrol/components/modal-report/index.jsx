import React, {Component} from 'react';

import './style.scss'
import Settings from "../../../../../platform/serivces/settings";
import ButtonLoader from "../../../../../components/loader-button";

class ModalReport extends Component {

  state = {
    isWrite: false
  }

  changeReport = (valueReport) => {
    if (valueReport === 4) {
      this.setState({isWrite: true})
    } else {
      this.setState({isWrite: false})

    }
  }

  render() {
    return (
        <div className="P-report-modal-container">
          <div className="P-report-block">
            <h3>{Settings.translations.report_title_text}</h3>

            <div className="P-report-select-box">
              <div className="P-report-checkbox-radio">
                <label>
                  <input type="radio" name='report' onChange={() => this.changeReport(1)}/>
                  <span/>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, minima!</p>
                </label>
              </div>
              <div className="P-report-checkbox-radio">
                <label>
                  <input type="radio" name='report' onChange={() => this.changeReport(2)}/>
                  <span/>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, minima!</p>
                </label>
              </div>
              <div className="P-report-checkbox-radio">
                <label>
                  <input type="radio" name='report' onChange={() => this.changeReport(3)}/>
                  <span/>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, minima!</p>
                </label>
              </div>
              <div className="P-report-checkbox-radio">
                <label>
                  <input type="radio" name='report' onChange={() => this.changeReport(4)}/>
                  <span/>
                  <p>Write some report</p>
                </label>
              </div>
            </div>
            {this.state.isWrite ? <div className="P-report-write">
              <label>
                <textarea/>
              </label>
            </div> : null}
            <ButtonLoader
                buttonText={Settings.translations.send_report_text}
                isLoading={false}
                onClick={this.props.close}
                classChange={'P-send-report-btn'}
            />
          </div>
        </div>
    );
  }
}

export default ModalReport;
