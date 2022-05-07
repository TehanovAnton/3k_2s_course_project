require('dotenv').config()
const passport = require('passport');
const { User } = require('../services/user_service');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

function extractJwtFromCoookie(req) {
  var token = null;

  if (req && req.cookies)
    token = req.cookies['accessToken'];

  return token;
}


passport.use(new JwtStrategy(
  { 
    secretOrKey: process.env.SESSION_SECRET,
    jwtFromRequest: extractJwtFromCoookie
  },

  async function(jwt_payload, done) {     
    let user = await User.findOne({ where: { email: jwt_payload.email, password: jwt_payload.password }, raw:true });

    if (user) { return done(null, user); }
    else { return done(null, false); }
  }
));

passport.serializeUser((user, done) => {
  return done(null, JSON.stringify(user))
})

passport.deserializeUser((user, done) => {
  return done(null, JSON.parse(user))
})

module.exports = passport