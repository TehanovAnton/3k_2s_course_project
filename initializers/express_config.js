require('dotenv').config();
const session = require('express-session');
const { express, application } = require('./express');

const cookieParser = require('cookie-parser')();

const expressLayouts = require('express-ejs-layouts')

const passport = require('./passport');

const rolesRouter = require('../controllers/roles_controller');
const usersRouter = require('../controllers/users_controller');
const companiesRouter = require('../controllers/companies_controller');
const parksRouter = require('../controllers/parks_controller');
const authenticationRouter = require('../controllers/authentication_controller');
const techniqueRouter = require('../controllers/technique_controller');

application.use(expressLayouts)
application.set('view engine', 'ejs');
application.set('views', './views');
application.set('layout', './layouts/application.ejs')

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(cookieParser);
application.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
application.use(passport.authenticate('session'));

application.use(rolesRouter);
application.use(usersRouter);
application.use(companiesRouter);
application.use(parksRouter);
application.use(authenticationRouter);
application.use(techniqueRouter);

application.get('/',
  (req, res) => {
    let viewBag = {}
    viewBag.title = 'Home Page'
    viewBag.techniquePath = '/technique/index'

    res.render('index', viewBag)
  }
)

module.exports = application;
