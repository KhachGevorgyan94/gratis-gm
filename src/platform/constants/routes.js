// const buildContext = (parent, subs) => {
//   const routes = {
//     valueOf() {
//       return parent;
//     }, ...subs
//   };
//   const actions = {
//     get(target, key) {
//       return parent + target[key];
//     }
//   };
//   return new Proxy(routes, actions);
// };

const ROUTES = {
  SUPER_ADMIN: {
    MAIN: '/dashboard',
    PHOTO_CONTROL: '/photo-control'

  },

  SIGN_IN: {
    ADMINS: '/sign-in',
  }
}

export default ROUTES;
