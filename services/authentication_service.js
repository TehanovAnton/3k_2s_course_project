require('dotenv').config()

const jwt = require('jsonwebtoken')
const authenticationRouter = require('express').Router();
const passport = require('../initializers/passport')

function jwtSign(email, password, key) {
  return jwt.sign(
    { email: email, password: password },
    key, 
    { expiresIn: 10 * 60 }
  )
}

function setAccessTokenInCokkie(req, res, next) {
  let accessToken = jwtSign(req.body.email, req.body.password, process.env.SESSION_SECRET)

  res.cookie('accessToken', accessToken)    

  next()
}

function authenticate() {
  return passport.authenticate('jwt', { session:true })
}

module.exports = { setAccessTokenInCokkie, authenticationRouter, passport, authenticate }