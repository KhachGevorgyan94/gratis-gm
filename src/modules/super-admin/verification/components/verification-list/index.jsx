import React, {Component} from 'react';
import './style.scss'
import './responsve.scss'

import Settings from "../../../../../platform/serivces/settings";
import {getStatusEnum, StatusENum} from "../../../../../platform/enums/status";
import Table from "antd/es/table";


class VerificationList extends Component {
  state = {
    isLoading: false,
    selectRow: null,
    selectedRowKeys: [],
  }


  columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
    },
    {
      title: Settings.translations.user_name,
      dataIndex: 'name',
      width: 200,
      render: text => <p title={text}>{text}</p>
    },
    {
      title: Settings.translations.user_last_name,
      dataIndex: 'surname',
      width: 200,
    },
    {
      title: Settings.translations.date,
      dataIndex: 'created_at',
    },
    {
      title: Settings.translations.country_text,
      dataIndex: 'country',
    },
    {
      title: Settings.translations.status,
      dataIndex: 'verification',
      width: 200,
      render: text => getStatusEnum(text),
    },
  ];

  setRowClassName = (record) => {
    return record.id !== this.state.selectRow ? '' : 'select-row';
  }

  render() {
    const {verificationList} = this.props
    return verificationList && (
        <>
          <Table className="G-new-table P-verification-table"
                 rowKey={'id'}
                 columns={this.columns}
                 dataSource={verificationList}
                 rowClassName={this.setRowClassName}
                 onRow={(item) => ({
                   onClick: () => {
                     if(this.state.selectRow===item.id){
                       this.setState({
                         selectRow: null,
                       });
                     }else{
                       this.setState({
                         selectRow: item.id,
                       });
                     }
                   }
                 })}
                 pagination={{pageSize: 50}}/>

        </>
    );
  }
}

export default VerificationList;
