import React, {Component} from 'react';

import Settings from "../../../../../platform/serivces/settings";
import Select from "../../../../../components/select/Select";
import './style.scss'
import {StatusList} from '../../services/service'

class PhotoControlHeader extends Component {

  state = {
    selectStatus: null,
    search: ''
  }




  changeStatus = (option) => {
    console.log(option)
  }


  render() {
    return (
        <div className="P-header-photo-control G-flex G-align-center">
          <div className={`G-input P-photo-control-inputs`}>
            <p>{Settings.translations.search_text}</p>
            <label>
              <input
                  type="text"
                  name='Search'
                  placeholder={Settings.translations.search_text}
                  onChange={this.changeInput}/>
            </label>
          </div>
          <div className='P-photo-control-inputs G-input'>
            <p>{Settings.translations.status}</p>
            <Select placeholder={Settings.translations.select}
                    list={StatusList} listKey={'value'}
                    output={this.changeStatus}/>
          </div>
          <div className='P-photo-control-inputs G-input'>
          </div>
        </div>
    );
  }
}

export default PhotoControlHeader;
