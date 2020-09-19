import ROUTES from '../../platform/constants/routes'
import SignIn from "./pages/sing-in-admins";

export const routerListSignIn = {
  role: '',
  pages: [
    {
      path: ROUTES.SIGN_IN.ADMINS,
      component: SignIn,
      exact: true,
    },

  ]
}

