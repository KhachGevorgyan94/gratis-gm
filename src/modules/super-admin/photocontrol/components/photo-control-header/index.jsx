import React, {Component} from 'react';

import Settings from "../../../../../platform/serivces/settings";
import Select from "../../../../../components/select/Select";
import './style.scss'
import {StatusList} from '../../services/service'
import DatePicker from 'react-datepicker';
import moment from "moment";
import MultiSelect from "../../../../../components/multi-select";
import ru from "date-fns/locale/ru";
import en from "date-fns/locale/en-GB";
import hy from "date-fns/locale/hy";

class PhotoControlHeader extends Component {

  state = {
    selectStatus: null,
    search: '',
    countryList: [],
    categoryType: []
  }


  componentDidMount() {
    this.createCountryList()
    this.setState({
      categoryType: JSON.parse(sessionStorage.getItem('TransportTypeList'))
    })
  }

  // changeStatus = (options) => {
  //   const {form, onChange} = this.props
  //   form.status = options.value
  //   onChange(form)
  // }


  createCountryList = () => {
    const {countryList} = this.state
    this.props.data.map(item => {
      countryList.push({name: item, value: item})
      return true
    })
    this.setState({countryList})
  }

  changeCountry = (options) => {
    const {form, onChange} = this.props
    form.filterModel.country = options
    form.page = 1
    onChange(form)
  }

  changeStatus = (options) => {
    const {form, onChange} = this.props
    form.filterModel.photoControlStatus = options
    form.page = 1
    onChange(form)
  }
  changeCategory = (options) => {
    const {form, onChange} = this.props
    form.filterModel.category = options
    form.page = 1
    onChange(form)
  }

  changeInput = (e) => {
    const {form, onChange} = this.props
    form.filterModel[e.currentTarget.name] = e.currentTarget.value
    onChange(form)
  }

  changeDateFrom = (data) => {
    const {form, onChange} = this.props
    form.filterModel.dateFrom = data
    onChange(form)
  }
  changeDateTo = (data) => {
    const {form, onChange} = this.props
    let currentDate = new Date()
    let time = new Date(data)

    if(moment(data).format('YYYY MMM DD').valueOf()=== moment(currentDate).format('YYYY MMM DD').valueOf()){
      time.setHours(23,59)
    }
    form.filterModel.dateTo = time
    onChange(form)
  }

  changeLanguagePiker = () => {
    if (Settings.language === 1) {
      return en
    }
    if (Settings.language === 2) {
      return hy
    }
    return ru
  }

  render() {
    const {countryList} = this.state
    const {form} = this.props
    return (
        <div className="P-header-photo-control G-flex G-align-center">
          <div className={`G-input P-photo-control-inputs`}>
            <p>{Settings.translations.search_text}</p>
            <label>
              <input
                  type="text"
                  name='search'
                  value={form.filterModel.search}
                  placeholder={Settings.translations.search_text}
                  onChange={this.changeInput}/>
            </label>
          </div>
          <div className='P-photo-control-inputs G-input G-date-picker'>
            <p>{Settings.translations.data}</p>

            <div className='G-date-picker G-flex G-align-center'>
              <DatePicker
                  placeholderText={Settings.translations.date_from}
                  selected={form.filterModel.dateFrom}
                  onChange={this.changeDateFrom}
                  selectsStart
                  startDate={form.filterModel.dateFrom}
                  endDate={form.filterModel.dateTo}
                  maxDate={form.filterModel.dateTo}
                  isClearable
                  showTimeSelect
                  timeFormat="HH:mm aa"
                  timeIntervals={1}
                  showMonthDropdown
                  showYearDropdown
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy HH:mm"
                  locale={this.changeLanguagePiker()}
              />
              <DatePicker
                  placeholderText={Settings.translations.date_to}
                  selected={form.filterModel.dateTo}
                  onChange={this.changeDateTo}
                  selectsEnd
                  timeIntervals={1}
                  showMonthDropdown
                  showYearDropdown
                  showTimeSelect
                  startDate={form.filterModel.dateFrom}
                  endDate={form.filterModel.dateTo}
                  minDate={form.filterModel.dateFrom}
                  isClearable
                  timeCaption="time"
                  timeFormat="HH:mm aa"
                  dateFormat="MMMM d, yyyy HH:mm"
                  locale={this.changeLanguagePiker()}

              />
            </div>
          </div>

          <div className='P-photo-control-inputs G-input'>
            <p>{Settings.translations.status}</p>
            <MultiSelect
                options={StatusList}
                changable={true}
                onChange={this.changeStatus}
                placeholder={Settings.translations.select_status}
                isSelectAll={true}
                value={form.filterModel.photoControlStatus}
            />
          </div>
          {this.state.categoryType ? <div className='P-photo-control-inputs G-input'>
            <p>{Settings.translations.category_text}</p>
            <MultiSelect
                options={this.state.categoryType}
                changable={true}
                onChange={this.changeCategory}
                placeholder={Settings.translations.select_status}
                isSelectAll={true}
                value={form.filterModel.category}

            />
          </div> : null}
          {countryList.length ? <div className='P-photo-control-inputs G-input'>
            <p>{Settings.translations.country_text}</p>
            <MultiSelect
                options={countryList}
                changable={true}
                onChange={this.changeCountry}
                placeholder={Settings.translations.select_country}
                isSelectAll={true}
                value={form.filterModel.country}

            />

          </div> : null}
        </div>
    );
  }
}

export default PhotoControlHeader;
