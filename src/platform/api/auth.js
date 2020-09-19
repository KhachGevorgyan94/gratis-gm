import Connection from '../serivces/connection';

const controllerName = 'auth';

class AuthController {

    static logIn = (body) => {
        const result = Connection.POST(controllerName, 'login', body);
        return result;
    };

    static GetBranchList = () => {
        const result = Connection.GET(controllerName, 'GetList',);
        return result;
    };



}
export default AuthController;

