import Settings from "../../../../../platform/serivces/settings";
import React, {Component} from 'react';
import carFrontSalonIcon from '../../../../../assets/images/svg/car_front_salon.svg'
import carBackSalonIcon from '../../../../../assets/images/svg/car_back_salon.svg'
import carFront from '../../../../../assets/images/svg/car_front.svg'
import carBack from '../../../../../assets/images/svg/car_back.svg'
import carLeftPath from '../../../../../assets/images/svg/car_left_block.svg'
import carRightPath from '../../../../../assets/images/svg/car_right_block.svg'
import carCard from '../../../../../assets/images/svg/id-card.svg'
import carCardDriver from '../../../../../assets/images/svg/driver-license.svg'
import pendingIcon from '../../../../../assets/images/svg/clock.svg'
import rejectIcon from '../../../../../assets/images/svg/close.svg'
import orderPendingIcon from '../../../../../assets/images/svg/refresh-button.svg'
import moment from "moment";

export const columnConfig = [
  {
    name: Settings.translations.information_text,
    style: {minWidth: 350, maxWidth: 200},
    cell: (row) => {
      return <div className="P-photo-control-information G-flex">

        <ul>
          <li>
            {row.status === Status.pending &&
            <i className='P-status-photo-control' style={{backgroundImage: `url('${pendingIcon}')`}}/>}
            {row.status === Status.rejected &&
            < i className='P-status-photo-control' style={{backgroundImage: `url('${rejectIcon}')`}}/>}
            {row.status === Status.orderPending &&
            < i className='P-status-photo-control' style={{backgroundImage: `url('${orderPendingIcon}')`}}/>}
          </li>
          <li>
            <span>{Settings.translations.model_text}:</span>
            <span>{row.mark} {row.model}</span>
          </li>
          <li>
            <span>{Settings.translations.car_text}:</span>
            <span> {row.carNum}</span>
          </li>
          <li>
            <span>{Settings.translations.color_text}:</span>
            <span>{row.color}</span>
          </li>
          <li>
            <span>{Settings.translations.year_car_text}:</span>
            <span>{row.year}</span>
          </li>
        </ul>
        <ul>
          <li style={{marginBottom: '15px'}}>
            <span>{moment(row.date).format('YYYY MMM DD | HH:MM').valueOf()}</span></li>
          <li title={row.sequenceNumber}>
            <span>N:</span>
            <span>{row.id}</span>
          </li>
          <li title={row.userId}>
            <span>ID: </span>
            <span>{row.userId}</span>
          </li>
          <li title={row.name + ' ' + row.surname}>
            <span>{Settings.translations.name_text}:</span>
            <span> {row.name} {row.surname}</span>
          </li>
        </ul>

      </div>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.before_car_text,
    style: {minWidth: 150},
    icon: carFront,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.front}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.left_side_car_text,
    style: {minWidth: 150},
    icon: carLeftPath,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.left_side}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.back_view_car_text,
    style: {minWidth: 150},
    icon: carBack,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.back}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.right_side_car_text,
    style: {minWidth: 150},
    icon: carRightPath,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.right_side}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.salon_A_car_text,
    style: {minWidth: 150},
    icon: carFrontSalonIcon,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.salon_a}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.salon_B_car_text,
    style: {minWidth: 150},
    icon: carBackSalonIcon,

    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.salon_b}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.passport_A_car_text,
    style: {minWidth: 150},
    icon: carCardDriver,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.tech_pass}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.passport_B_car_text,
    style: {minWidth: 150},
    icon: carCardDriver,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.tech_pass_b}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.driver_rights_A_car_text,
    style: {minWidth: 150},

    icon: carCard,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.license}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.driver_rights_B_car_text,
    style: {minWidth: 150},
    icon: carCard,
    cell: (row) => {
      return <div className="P-photo-table-image" style={{backgroundImage: `url('${row.photo.license_b}')`}}/>
    },
    isShow: true,
    isFixed: false,
  },

];


export const Status = {
  pending: 'pending',
  rejected: 'rejected',
  orderPending: 'order_pending'
}

export const SaveRejectStatus = {
  save: 1,
  reject: 2,
  verification: 3
}

