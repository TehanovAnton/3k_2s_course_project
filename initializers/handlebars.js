const { create } = require('express-handlebars');
const Handlebars = require('handlebars');
const helpers = require('../helpers/helpers');

Handlebars.registerHelper('cancelLink', () => '');

const hbs = create({
  partialsDir: ['views/companies/partials/'],
  helpers,
});

module.exports = { Handlebars, hbs };
