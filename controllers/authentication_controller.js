const {
  setAccessTokenInCokkie,
  setAccessTokenInHeader,
  authenticationRouter,
  passport,
} = require('../services/authentication_service');

authenticationRouter.get(
  '/signup',  
  (req, res) => {
    res.render('./authentication/signup', { createUserPath: '/users/create' });
  }
);

authenticationRouter.post(
  '/login',
  setAccessTokenInCokkie,
  passport.authenticate('jwt', { session: true, successRedirect: '/' }),
);

module.exports = authenticationRouter;
