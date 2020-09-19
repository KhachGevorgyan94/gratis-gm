import ROUTES from "../../platform/constants/routes";
import SuperAdminDashboard from "./dashboard";
import SuperAdminPhotoControl from "./photocontrol";
import photoControlIcon from '../../assets/images/menu-icons/photocontrol.png'
import orderIcon from '../../assets/images/menu-icons/orders.png'

import Settings from "../../platform/serivces/settings";

export const routerListSuperAdmin = {
  role: 'SuperAdmin',
  pages: [
    {
      path: ROUTES.SUPER_ADMIN.MAIN,
      component: SuperAdminDashboard,
      exact: true,
    },
    {
      path: ROUTES.SUPER_ADMIN.PHOTO_CONTROL,
      component: SuperAdminPhotoControl,
      exact: true,
    },
  ]
}

export const SuperAdminSideBar = [
  {
    id: 1,
    name: Settings.translations.orders,
    path: ROUTES.SUPER_ADMIN.MAIN,
    icon: orderIcon,
  },
  {
    id: 2,
    name: Settings.translations.photo_control,
    path: ROUTES.SUPER_ADMIN.PHOTO_CONTROL,
    icon: photoControlIcon,
  },

]
