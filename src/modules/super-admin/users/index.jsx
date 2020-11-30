import React, {Component} from 'react';
import HeaderComponent from "../../../components/admin-page-header";
import Settings from "../../../platform/serivces/settings";
import './style.scss'

import PageLoader from "../../../components/page-loader";
import UserFilter from "./components/users-filter";
import UserList from "./components/users-list";
import VerificationController from "../../../platform/api/user";

class SuperAdminUsers extends Component {
  state = {
    isLoading: false,
    data: null,
    filterData: null,
    filter: {
      search: '',
      status: 0,
      country: Settings.translations.all_text
    },
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true}, async () => {
      const result_1 = await VerificationController.GetUsersList()
      if (result_1.status) {
        this.setState({
          data: [...result_1.data],
          filterData: [...result_1.data],
          isLoading: false
        })
      }
    })
  }


  onChange = (filter) => {
    this.setState({filter}, () => {
      this.filterUsers()

    })
  }

  filterUsers = () => {

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
                <UserFilter filter={this.state.filter}
                            onChange={this.onChange}/>
                <UserList verificationList={this.state.filterData}/>
              </div>
            </div>
          </div>
          {this.state.isLoading ? <PageLoader active={true}/> : null}

        </div>
    );
  }
}

export default SuperAdminUsers;
