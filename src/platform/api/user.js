import Connection from '../serivces/connection';

const controllerName = 'data';

class VerificationController {

    static GetVerificationList = (value) => {
        const result = Connection.POST(controllerName, `users/verified/${value}`, );
        return result;
    };
    static GetUsersList = () => {
        const result = Connection.POST(controllerName, `getUsers`, );
        return result;
    };





}
export default VerificationController;

