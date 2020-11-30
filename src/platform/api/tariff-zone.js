import Connection from '../serivces/connection';

const controllerName = 'data/tariffZone';

class TariffZoneController {
  static getCountryList = () => {
    const result = Connection.POST(controllerName, 'countries');
    return result;
  };

  static getTransportTypeList = () => {
    const result = Connection.POST(controllerName, 'transportType');
    return result;
  };
}

export default TariffZoneController;

