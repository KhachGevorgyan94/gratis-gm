import Connection from '../serivces/connection';

const controllerName = 'data/photocontrol';

class PhotoController {

  static GetPhotoControlList = (data) => {
    const result = Connection.POST(controllerName, '', data);
    return result;
  };

  static RejectDriver = (id, body) => {
    const result = Connection.PUT(controllerName, `${id}`, body);
    return result;
  };

}

export default PhotoController;

