const {
  setAccessTokenInCokkie,
  setAccessTokenInHeader,
  authenticationRouter,
  passport,
} = require('../services/authentication_service');

authenticationRouter.get(
  '/signup',  
  (req, res) => {
    let viewBag = {}
    viewBag.createUserPath = '/users/create'
    
    res.render('./authentication/signup', viewBag);
  }
);

authenticationRouter.post(
  '/login',
  setAccessTokenInCokkie,
  passport.authenticate('jwt', { session: true, successRedirect: '/' }),
);

module.exports = authenticationRouter;
