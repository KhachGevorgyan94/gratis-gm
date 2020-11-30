import React, {Component} from 'react';

import Settings from "../../../../../platform/serivces/settings";
import {getStatusEnum} from "../../../../../platform/enums/status";

export const columnConfig = [
  {
    name: Settings.translations.user_id,
    style: {minWidth: 80, maxWidth: 80},
    cell: (row) => {
      return row.id
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: 'ID',
    style: {minWidth: 100, maxWidth: 70},
    cell: (row) => {
      return row.userId
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.user_name,
    style: {minWidth: 100},
    cell: (row) => {
      return row.name
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.user_last_name,
    style: {minWidth: 100},
    cell: (row) => {
      return row.surname
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.registration_date,
    style: {minWidth: 150},
    cell: (row) => {
      return row.created_at
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.gender,
    style: {minWidth: 100},
    cell: (row) => {
      return row.gender
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.phone_number,
    style: {minWidth: 120},
    cell: (row) => {
      return row.phone
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.work_phone_number,
    style: {minWidth: 150},
    cell: (row) => {
      return row.phone2
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.date_of_birth,
    style: {minWidth: 150},
    cell: (row) => {
      return row.birthday
    },
    isShow: true,
    isFixed: false,
  },

  {
    name: Settings.translations.isOnline,
    style: {minWidth: 100},
    cell: (row) => {
      return row.online
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.country_passport_user,
    style: {minWidth: 150},
    cell: (row) => {
      return row.countryPassport
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.region,
    style: {minWidth: 100},
    cell: (row) => {
      return row.country
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.city,
    style: {minWidth: 100},
    cell: (row) => {
      return row.city
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.verification,
    style: {minWidth: 150},
    cell: (row) => {
      return getStatusEnum(row.verification)
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.date_of_contribution,
    style: {minWidth: 150},
    cell: (row) => {
      return row.dateOfContribution
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.rights,
    style: {minWidth: 150},
    cell: (row) => {
      return row.rights
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.category,
    style: {minWidth: 150},
    cell: (row) => {
      return returnCarProps(row, 'category')
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.tariff,
    style: {minWidth: 150},
    cell: (row) => {
      return returnCarTariffs(row)
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.brand,
    style: {minWidth: 150},
    cell: (row) => {
      return returnCarProps(row, 'mark')
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.model,
    style: {minWidth: 150},
    cell: (row) => {
      return returnCarProps(row, 'model')
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.car_number,
    style: {minWidth: 150},
    cell: (row) => {
      return returnCarProps(row, 'carNum')
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.photo_control,
    style: {minWidth: 150},
    cell: (row) => {
      return row.photoControl
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.first_order,
    style: {minWidth: 150},
    cell: (row) => {
      return row.firstOrder
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.driver_rating,
    style: {minWidth: 150},
    cell: (row) => {
      return row.driverRating
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.balance,
    style: {minWidth: 150},
    cell: (row) => {
      return row.driverBalance + ' AMD'
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.available_amount,
    style: {minWidth: 150},
    cell: (row) => {
      return row.businessBalance + ' AMD'
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.last_entrance,
    style: {minWidth: 150},
    cell: (row) => {
      return row.lastEntrance
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.last_order_date_driver,
    style: {minWidth: 300},
    cell: (row) => {
      return row.lastOrderDateDriver
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.last_order_date_client,
    style: {minWidth: 300},
    cell: (row) => {
      return row.lastOrderDateClient
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.inviter,
    style: {minWidth: 150},
    cell: (row) => {
      return row.inviter
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.device_version,
    style: {minWidth: 150},
    cell: (row) => {
      return row.deviceVersion
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.currency_text,
    style: {minWidth: 150},
    cell: (row) => {
      return row.currency
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.black_driver,
    style: {minWidth: 150},
    cell: (row) => {
      return row.blackDriver
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.black_client,
    style: {minWidth: 150},
    cell: (row) => {
      return row.blackClient
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.generations_text,
    style: {minWidth: 150},
    cell: (row) => {
      return row.generation
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.client_activation,
    style: {minWidth: 150},
    cell: (row) => {
      return row.clientActivity
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.users_type,
    style: {minWidth: 150},
    cell: (row) => {
      return row.userType
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.device_type,
    style: {minWidth: 150},
    cell: (row) => {
      return row.deviceType
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.Income_from_b_p,
    style: {minWidth: 150},
    cell: (row) => {
      return row.income
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.country_for_phone,
    style: {minWidth: 150},
    cell: (row) => {
      return row.phoneRegion
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.became_driver,
    style: {minWidth: 200},
    cell: (row) => {
      return row.driverBecomeDate
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.verification_request,
    style: {minWidth: 200},
    cell: (row) => {
      return row.verificationStatusChangeDate
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.verification_date,
    style: {minWidth: 200},
    cell: (row) => {
      return row.verificationRequestDate
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.photo_control_request,
    style: {minWidth: 200},
    cell: (row) => {
      return row.photoControlStatusChangeDate
    },
    isShow: true,
    isFixed: false,
  },
  {
    name: Settings.translations.photo_control_date,
    style: {minWidth: 200},
    cell: (row) => {
      return row.photoControlRequestDate
    },
    isShow: true,
    isFixed: false,
  },
];


export const returnCarProps = (row, keyProps) => {
  let propsText = ''
  if (row.cars.length) {
    row.cars.map((item, index) => {
      propsText += item[keyProps] + (index !== row.cars.length - 1 ? ', ' : '')
    })
  }
  return propsText
}

export const returnCarTariffs = (row) => {
  let propsText = ''
  if (row.cars.length) {
    row.cars.map(item => {
      if (item.tariffs) {
        item.tariffs.map((tariffsItems, index) => {
          propsText += tariffsItems + (index !== item.tariffs.length - 1 ? ', ' : '')
        })
      }
    })
  }
  return <p className="P-text-ellipsis" title={propsText}>{propsText}</p>
}
