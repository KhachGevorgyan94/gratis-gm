import React, {Component} from 'react';
import HeaderComponent from "../../../components/admin-page-header";
import Settings from "../../../platform/serivces/settings";
import './style.scss'
import PhotoControlHeader from "./components/photo-control-header";
import PhotoControlList from "./components/photo-control-list";
import PhotoController from "../../../platform/api/photo-control";
import PageLoader from "../../../components/page-loader";

class SuperAdminPhotoControl extends Component {

  state = {
    selectStatus: null,
    search: '',
    isLoading: false,
    data: null
  }

  componentDidMount() {
    this.fetchData()
  }


  changeStatus = (option) => {
    console.log(option)
  }

  fetchData = async () => {
    this.setState({
      isLoading: true
    }, async () => {
      const result = await PhotoController.GetPhotoControlList()
      if (result.status) {
        console.log(result)
        this.setState({isLoading: false, data: result.data})
      }
    })

  }


  render() {
    const {data} = this.state
    return (
        <div className="G-admin-pages">
          <div className="G-admin-block">

            {/*  Admin page header path  */}
            <HeaderComponent headerTitle={Settings.translations.photo_control}/>
            {/* Admin page main components */}


            <div className="P-admin-container">
              <div className="P-admin-page-box">
                <PhotoControlHeader/>
                {data ? <PhotoControlList data={data}/> : null}

              </div>
            </div>
          </div>
          {this.state.isLoading ? <PageLoader active={true}/> : null}

        </div>
    );
  }
}

export default SuperAdminPhotoControl;
