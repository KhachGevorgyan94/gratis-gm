import React, {Component} from 'react';
import HeaderComponent from "../../../components/admin-page-header";
import Settings from "../../../platform/serivces/settings";



class SuperAdminDashboard extends Component {


  componentDidMount() {
  }


  render() {
    return (
        <div className="G-admin-pages">
          <div className="G-admin-block">

            {/*  Admin page header path  */}
            <HeaderComponent headerTitle={Settings.translations.orders}/>
            {/* Admin page main components */}


            <div className="P-admin-container">
              <div className="P-admin-page-box">
                Super admin dashboard

              </div>
            </div>
          </div>

        </div>
    );
  }
}

export default SuperAdminDashboard;
