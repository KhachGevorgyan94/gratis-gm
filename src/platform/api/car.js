import Connection from '../serivces/connection';

const controllerName = 'data/cars';

class CarController {

    static getCarList = () => {
        const result = Connection.POST(controllerName, '');
        return result;
    };






}
export default CarController;

