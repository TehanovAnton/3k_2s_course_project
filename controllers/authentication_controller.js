const { User } = require('../services/user_service');
const authenticationRouter = require('express').Router();
const passport = require('../initializers/passport')
const jwt = require('jsonwebtoken')

authenticationRouter.post('/login',
  function (req, res, next) {
    let accessToken = jwt.sign(
      { email: req.body.email, password: req.body.password  },
      process.env.ACCESS_TOKEN, 
      { expiresIn: 10 * 60 }
    )

    console.log(accessToken);
    res.cookie('accessToken', accessToken)    

    next()
  },
  passport.authenticate('jwt', { session:true })
)

module.exports = authenticationRouter
