require('dotenv').config();
const passport = require('passport');
const { User } = require('../services/user_service');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

function extractJwtFromCoookie(req) {
  let token = null;

  if (req && req.cookies) token = req.cookies.accessToken;

  return token;
}

passport.use(new JwtStrategy(
  {
    secretOrKey: process.env.SESSION_SECRET,
    jwtFromRequest: extractJwtFromCoookie,
  },

  (async (jwt_payload, done) => {
    const user = await User.findOne({ where: { email: jwt_payload.email, password: jwt_payload.password }, raw: true });

    if (user) { return done(null, user); }
    return done(null, false);
  }),
));

passport.serializeUser((user, done) => done(null, JSON.stringify(user)));

passport.deserializeUser((user, done) => done(null, JSON.parse(user)));

module.exports = passport;
