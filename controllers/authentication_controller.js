const {
  setAccessTokenInCookie,
  authenticate,
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

authenticationRouter.get(
  '/login',  
  (req, res) => {
    let viewBag = {}
    viewBag.loginUserPath = '/login'
    
    res.render('./authentication/login', viewBag);
  }
);

authenticationRouter.post(
  '/login',
  setAccessTokenInCookie,
  authenticate('/', '/login'),
);

module.exports = authenticationRouter;
