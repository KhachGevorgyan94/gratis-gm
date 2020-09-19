import Connection from '../serivces/connection';

const controllerName = 'data/photocontrol';

class PhotoController {

  static GetPhotoControlList = () => {
    const result = Connection.POST(controllerName, '', );
    return result;
  };


}

export default PhotoController;

