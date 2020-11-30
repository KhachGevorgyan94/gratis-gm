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
    data: null,
    page: null,
    form: {
      country: '',
      status: ''
    },
    reqData: {
      page: 1,
      count: 10,
      filterModel: {
        search: '',
        photoControlStatus: [],
        category: [],
        country: [],
        dateFrom: null,
        dateTo: null,
      }
    }
  }

  componentDidMount() {
    this.fetchData()
  }


  changeStatus = (option) => {
  }

  fetchData = async () => {
    this.setState({
      isLoading: true
    }, async () => {
      const result = await PhotoController.GetPhotoControlList(this.state.reqData)
      if (result.status) {
        result.data.map(item => {
          item.photo = {
            front: item.photo.front,
            left_side: item.photo.left_side,
            back: item.photo.back,
            right_side: item.photo.right_side,
            salon_a: item.photo.salon_a,
            salon_b: item.photo.salon_b,
            license: item.photo.license,
            license_b: item.photo.license_b,
            tech_pass: item.photo.tech_pass,
            tech_pass_b: item.photo.tech_pass_b,
          }
        })
        this.setState({
          isLoading: false, data: result, page: result.page
        })

      }
    })

  }

  onChange = (form) => {
    this.setState({reqData: form}, () => {
      this.fetchData()
    })
  }


  render() {
    const {data, page} = this.state
    return (
        <div className="G-admin-pages">
          <div className="G-admin-block">

            {/*  Admin page header path  */}
            <HeaderComponent headerTitle={Settings.translations.photo_control}/>
            {/* Admin page main components */}

            <div className="P-admin-container">
              <div className="P-admin-page-box">

                {data ?
                    <PhotoControlHeader onChange={this.onChange} form={this.state.reqData}
                                        data={data.countries}/> : null}

                {data ?
                    <PhotoControlList onChange={this.onChange} form={this.state.reqData} data={data.data} page={page}
                                      fetchData={this.fetchData}/> : null}
              </div>
            </div>
          </div>
          {this.state.isLoading ? <PageLoader active={true}/> : null}

        </div>
    );
  }
}

export default SuperAdminPhotoControl;
