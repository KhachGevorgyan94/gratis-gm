//? Service to save some settings

import Russian from '../../assets/translations/ru';
import English from '../../assets/translations/en';
import Armenian from '../../assets/translations/arm';
import CarController from "../api/car";
import TariffZoneController from "../api/tariff-zone";

export const LanguageEnum = {
  English: 'English',
  Armenian: 'Armenian',
  Russian: 'Russian'
};


class Settings {

  static defaultLanguage = LanguageEnum.Russian

  static CountryList = [];
  static CarModeList = null;
  static  CarMarkList = []
  static  CarColorList = []
  static TransportTypeList = []
  static TransportTypeListId = []
  static YearList = []


  static get language() {

    const storageLanguage = window.localStorage.getItem('Language') || this.defaultLanguage;
    // const language = storageLanguage;
    if (!storageLanguage || !LanguageEnum[storageLanguage]) {
      return Settings.defaultLanguage;
    }
    return storageLanguage;
  }

  static set language(value) {
    window.localStorage.setItem('Language', value);
    window.location.reload();
  }

  static get translations() {
    if (Settings.language === LanguageEnum.English) {
      return English;
    }
    if (Settings.language === LanguageEnum.Armenian) {
      return Armenian
    }
    return Russian;
  }

  get guestId() {
    const id = window.localStorage.getItem('guestId');
    return id || null;
  }

  set guestId(value) {
    if (value) {
      window.localStorage.setItem('guestId', value);
    } else {
      window.localStorage.removeItem('guestId');
    }
  }

  static  getCountryAndCarProps = async () => {
    if (token && role) {
      const resultCars = await CarController.getCarList()
      this.CarColorList = [];
      this.CarMarkList = []
      if (resultCars.status) {
        resultCars.data.colors.map((item, index) => {
          this.CarColorList.push({name: item.name, value: item.name})
          return true
        })
        resultCars.data.mark.map((item, index) => {
          this.CarMarkList.push({name: item.name, value: item.key})
          return true

        })
        this.CarModeList = resultCars.data.models
        this.YearList = []
        for (let i = 1990; i < 2020; i++) {
          this.YearList.push({name: i, value: i})
        }
      }

      const resultCountry = await TariffZoneController.getCountryList()
      this.CountryList = []
      if (resultCountry.status) {
        resultCountry.data.map(item => {
          this.CountryList.push({name: item.country, value: item.country})
          return true

        })
      }

      const resultTransportType = await TariffZoneController.getTransportTypeList()
      this.TransportTypeList = []
      if (resultTransportType.status) {
        console.log(resultTransportType.data)
        resultTransportType.data.map(item => {
          this.TransportTypeList.push({name: item.name, value: item.name, classes:item.classes})
          sessionStorage.setItem('TransportTypeList',JSON.stringify(this.TransportTypeList))
          return true

        })
      }
    }


  }


}

// export const isValidEmail = (value) => {
//     if (!value && value !== '') return false;
//     const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regex.test(value);
// };


export const isValidNonCityPhone = (value) => {
  if (!value && value !== '') return false;
  // const beeline = '91|99|96|43';
  // const ucom = '55|95|41|44';
  // const mts = '93|94|77|49|98';
  // const regex = new RegExp(`^(374)((?:${mts}|${beeline}|${ucom})([0-9]{6}))$`);
  const regex = new RegExp('^[+][0-9]*$');

  return regex.test(value);
};


export const token = window.localStorage.getItem('token');
export const role = window.localStorage.getItem('role');

export default Settings;
