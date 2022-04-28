const jwt = require('jsonwebtoken')
const authenticationRouter = require('express').Router();
const passport = require('../initializers/passport')

function jwtSign(email, password) {
  return jwt.sign(
    { email: email, password: password },
    process.env.ACCESS_TOKEN, 
    { expiresIn: 10 * 60 }
  )
}

function setAccessTokenInCokkie(req, res, next) {
  let accessToken = jwtSign(req.body.email, req.body.password)

  console.log(accessToken);
  res.cookie('accessToken', accessToken)    

  next()
}

module.exports = { setAccessTokenInCokkie, authenticationRouter, passport }