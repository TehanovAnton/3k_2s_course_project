const {
  setAccessTokenInCookie,
  authenticate,
  authenticationRouter,
  passport,
  logOut,
} = require('../services/authentication_service');

authenticationRouter.get(
  '/signup',
  (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated() }
    viewBag.createUserPath = '/users/create';

    res.render('./authentication/signup', viewBag);
  },
);

authenticationRouter.get(
  '/login',
  (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated() }
    viewBag.loginUserPath = '/login';

    res.render('./authentication/login', viewBag);
  },
);

authenticationRouter.post(
  '/login',
  setAccessTokenInCookie,
  authenticate('/', '/login'),
);

authenticationRouter.delete(
  '/logout',
  logOut,
);

module.exports = authenticationRouter;
