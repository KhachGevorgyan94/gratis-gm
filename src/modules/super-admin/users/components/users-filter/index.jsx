import React, {Component} from 'react';
import './style.scss'
import './responsive.scss'
import Settings from "../../../../../platform/serivces/settings";
import searchIcon from '../../../../../assets/images/search.png'
import Select from "../../../../../components/select/Select";
import {StatusList} from "../../../photocontrol/services/service";


class UserFilter extends Component {


  changeStatus = (options) => {
    const {filter, onChange} = this.props
    filter.status = options.value;
    onChange(filter)
  }
  changeCountry = (options) => {
    const {filter, onChange} = this.props
    filter.country = options.value;
    onChange(filter)
  }

  inputChange = (e) => {
    const {filter, onChange} = this.props
    filter[e.currentTarget.name] = e.currentTarget.value
    onChange(filter)
  }


  render() {
    const {filter} = this.props

    return (
        <div className="P-verification-filter-section G-flex G-align-start">
          <div className={`G-input P-verification-filter`}>
            <p>{Settings.translations.search_text}</p>
            <label>
              <input
                  type="text"
                  name='search'
                  placeholder={Settings.translations.search_text}
                  onChange={this.inputChange}/>
              <span className="P-search-icon" style={{backgroundImage: `url('${searchIcon}')`}}/>
            </label>
          </div>
          <div className='P-photo-control-inputs G-input'>
            <p>{Settings.translations.status}</p>
            <Select placeholder={Settings.translations.select}
                    options={StatusList}
                    listKey={'value'}
                    useValue={true}
                    value={filter.status}
                    placeholderOpacity={true}
                    isAllList={true}
                    onChange={this.changeStatus}/>
          </div>

        </div>
    );
  }
}

export default UserFilter;
