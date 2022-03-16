const express = require('express');
const application = express();
const hbs = require('./handlebars').hbs;

const rolesRouter = require('../controllers/roles_controller');
const usersRouter = require('../controllers/users_controller');
const companiesRouter = require('../controllers/companies_controller');
const parksRouter = require('../controllers/parks_controller');

application.engine('handlebars', hbs.engine);
application.set('view engine', 'handlebars')
application.set('views', './views')

application.use(express.json())
application.use(express.urlencoded({ extended: true }))

application.use(rolesRouter);
application.use(usersRouter);
application.use(companiesRouter);
application.use(parksRouter);

module.exports = { express, application }