import React, {Component} from 'react';
import HeaderComponent from "../../../components/admin-page-header";
import Settings from "../../../platform/serivces/settings";
import './style.scss'

import PageLoader from "../../../components/page-loader";
import VerificationList from "./components/verification-list";
import VerificationController from "../../../platform/api/user";
import {getStatusEnum} from "../../../platform/enums/status";
import VerificationFilter from "./components/verification-filter";

class SuperAdminVerification extends Component {
  state = {
    isLoading: false,
    data: null,
    filterData: null,
    filter: {
      search: '',
      status: 0,
      country: Settings.translations.all_text
    },
    countryList: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true}, async () => {
      const result_1 = await VerificationController.GetVerificationList(1)
      const result_2 = await VerificationController.GetVerificationList(2)
      if (result_1.status && result_2.status) {
        this.setState({
          data: [...result_1.data, ...result_2.data],
          filterData: [...result_1.data, ...result_2.data],
          isLoading: false
        })
        this.getCountryList([...result_1.data])
      }
    })
  }

  getCountryList = (data) => {
    const {countryList} = this.state
    let arrayList = data
    const filteredArr = arrayList.reduce((acc, current) => {
      const x = acc.find(item => item.country === current.country);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    countryList.push({name: Settings.translations.all_text, value: 0})

    if (filteredArr.length) {
      filteredArr.map(item => {
        countryList.push({name: item.country, value: item.country})
      })
    }
    this.setState({countryList})
  }

  onChange = (filter) => {
    this.setState({filter}, () => {
      this.filterVerificationListSearch()
    })
  }


  filterVerificationListSearch = () => {
    const {data, filter} = this.state;
    let filterData = data;

    if (filter.search) {
      filterData = filterData.filter(item => {
        return item.userId.toLowerCase().includes(filter.search.toLowerCase()) ||
            item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            item.surname.toLowerCase().includes(filter.search.toLowerCase())
      })
    }
    if (filter.country &&  filter.country!==Settings.translations.all_text) {
      filterData = filterData.filter(item => {
        return item.country.toLowerCase().includes(filter.country.toLowerCase())
      })
    }
    if (filter.status  && filter.status!==0) {
      filterData = filterData.filter(item => {
        return item.verification === filter.status
      })
    }
    this.setState({filterData})
  }


  render() {
    return (
        <div className="G-admin-pages">
          <div className="G-admin-block">

            {/*  Admin page header path  */}
            <HeaderComponent headerTitle={Settings.translations.verification}/>
            {/* Admin page main components */}

            <div className="P-admin-container">
              <div className="P-admin-page-box">
                <VerificationFilter countryList={this.state.countryList} filter={this.state.filter}
                                    onChange={this.onChange}/>
                <VerificationList verificationList={this.state.filterData}/>
              </div>
            </div>
          </div>
          {this.state.isLoading ? <PageLoader active={true}/> : null}

        </div>
    );
  }
}

export default SuperAdminVerification;
