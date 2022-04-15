require('dotenv').config()
const { express, application } = require('../initializers/express')
const session = require('express-session')

const hbs = require('./handlebars').hbs;
const cookieParser = require('cookie-parser')()

const passport = require('../initializers/passport')

const rolesRouter = require('../controllers/roles_controller');
const usersRouter = require('../controllers/users_controller');
const companiesRouter = require('../controllers/companies_controller');
const parksRouter = require('../controllers/parks_controller');
const authenticationRouter = require('../controllers/authentication_controller');

application.engine('handlebars', hbs.engine);
application.set('view engine', 'handlebars')
application.set('views', './views')

application.use(express.json())
application.use(express.urlencoded({ extended: true }))
application.use(cookieParser)
application.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
application.use(passport.authenticate('session'));


application.use(rolesRouter);
application.use(usersRouter);
application.use(companiesRouter);
application.use(parksRouter);
application.use(authenticationRouter)

module.exports = application