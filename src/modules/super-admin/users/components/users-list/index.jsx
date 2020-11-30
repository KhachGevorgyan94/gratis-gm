import React, {Component} from 'react';
import './style.scss'
import './responsive.scss'

import Settings from "../../../../../platform/serivces/settings";
import {getStatusEnum} from "../../../../../platform/enums/status";
import Table from "antd/es/table";
import DataTable from "../../../../../components/table";
import {columnConfig} from "./service";
import Pagination from "antd/es/pagination";


class UserList extends Component {
  state = {
    isLoading: false,
  }


  render() {
    const {verificationList} = this.props
    return verificationList && (
        <>
          <DataTable columnConfig={columnConfig}
                     data={verificationList}
                     changeStyle={'P-user-table'}
                     isMultiSelect={false}
                     selectItemType={'id'}
                     multiSelectArray={[]}
                     isDragDrop={true}
                     isShowColumnList={true}
                     isFixedColumns={true}
          />
          <div className="G-pagination-block">
            <Pagination total={verificationList.length}
                // showTotal={total => `Total ${total} items`}
                        defaultPageSize={5}
                        pageSizeOptions={[5,10,20,50,100]}
                        defaultCurrent={1}
                        showSizeChanger
                        showQuickJumper/>
          </div>
        </>
    );
  }
}

export default UserList;
