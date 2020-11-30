import React, {Component} from 'react';
import './style.scss'
import Settings from "../../../../../platform/serivces/settings";
import EmptyList from "../empty-list";
import Modal from "../../../../../components/modal";
import PhotoControlDetails from "../modal-details";
import DataTable from "../../../../../components/table";
import {columnConfig} from './service'
import Pagination from "antd/es/pagination";
import locale from 'antd/es/date-picker/locale/zh_CN';

class PhotoControlList extends Component {

  state = {
    isOpenModal: false,
    photoControlDetails: null,
  }

  componentDidMount() {
  }

  openModal = (data) => {
    this.setState({
      isOpenModal: true,
      photoControlDetails: data
    })
  }

  closeModal = () => {
    this.setState({isOpenModal: false})
  }


  // openModal = (e,id)=>{
  //   this.setState({
  //     isOpenModal: true,
  //     photoControlDetails: data
  //   })
  //
  // }

  changePagination = (page) => {
    const {form, onChange} = this.props
    form.page = page
    onChange(form)
  }
  changeSize = (page, size) => {
    const {form, onChange} = this.props
    form.count = size
    form.page = 1;
    onChange(form)
  }

  render() {
    const {data, page} = this.props
    return (
        <div className="P-photo-control-table-block">
          {data && data.length ?
              <div className="G-table-block">
                <DataTable columnConfig={columnConfig}
                           data={data}
                           changeStyle={'P-photo-control-table'}
                           isMultiSelect={false}
                           selectItemType={'id'}
                           multiSelectArray={[]}
                           onDoubleClick={this.openModal}
                           isDragDrop={false}
                           isShowColumnList={false}
                           isFixedColumns={false}
                />
                <div className="G-pagination-block">
                  <Pagination total={page.item_count}
                      // showTotal={total => `Total ${total} items`}
                              defaultPageSize={this.props.form.count}
                              pageSizeOptions={[5, 10, 20, 50, 100]}
                              defaultCurrent={this.props.form.page}
                              showSizeChanger
                              showQuickJumper
                              onChange={this.changePagination}
                              onShowSizeChange={this.changeSize}

                  />
                </div>
              </div> :
              <EmptyList/>

          }

          <Modal close={() => {
          }} isOpen={this.state.isOpenModal} changeClass={'P-photo-control-modal'}>
            <PhotoControlDetails fetchData={this.props.fetchData}
                                 data={this.state.photoControlDetails} close={this.closeModal}/>
          </Modal>
        </div>
    );
  }
}

export default PhotoControlList;
