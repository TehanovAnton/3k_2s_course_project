require('dotenv').config();

const jwt = require('jsonwebtoken');
const authenticationRouter = require('express').Router();
const passport = require('../initializers/passport');

function jwtSign(email, password, key) {
  return jwt.sign(
    { email, password },
    key,
    { expiresIn: 30 * 60 },
  );
}

function setAccessTokenInCookie(req, res, next) {
  const accessToken = jwtSign(req.body.email, req.body.password, process.env.SESSION_SECRET);

  res.cookie('accessToken', accessToken);

  res.redirect('/');
}

function authenticate(successRedirect = null, failureRedirect = '/login') {
  const passportOptions = { session: true };  

  if (successRedirect) { passportOptions.successRedirect = successRedirect; }
  if (failureRedirect) { passportOptions.failureRedirect = failureRedirect; }

  return passport.authenticate('jwt', passportOptions);
}

function logOut(req, res) {
  if (req.session) {
    req.session.destroy();
  }
  res.clearCookie('accessToken');
  req.logout();
  res.redirect('/login');
}

module.exports = {
  setAccessTokenInCookie, authenticationRouter, passport, authenticate, logOut,
};
