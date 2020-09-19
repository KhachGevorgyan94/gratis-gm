import {
  routerListSuperAdmin,
  SuperAdminSideBar,
  routerListSignIn,
} from '../../modules/index'

class RouteServices {

  static getRoleRouter = () => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    switch (role) {
      case 'SuperAdmin': {
        if (token) {
          return routerListSuperAdmin
        }
        return routerListSignIn
      }
      default : {
        return routerListSignIn
      }
    }
  }
  static  getSideBarList = () => {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'SuperAdmin': {
        return SuperAdminSideBar
      }
      default : {
        return SuperAdminSideBar
      }
    }
  }

  static isRole = () => {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'SuperAdmin': {
        return true
      }
      default : {
        return false
      }
    }
  }


}

export default RouteServices
