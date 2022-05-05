
const { 
  setAccessTokenInCokkie,
  setAccessTokenInHeader,
  authenticationRouter,
  passport
} = require('../services/authentication_service')


authenticationRouter.post('/login',
  setAccessTokenInCokkie,
  passport.authenticate('jwt', { session:true, successRedirect: '/users' }),
)

module.exports = authenticationRouter
