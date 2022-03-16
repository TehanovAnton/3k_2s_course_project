const { create } = require('express-handlebars');
const Handlebars = require('handlebars');
const helpers = require('../helpers/helpers');

Handlebars.registerHelper('cancelLink', function() {
    return '';
});

const hbs = create({
    partialsDir: ['views/companies/partials/'],
    helpers: helpers
});

module.exports = { Handlebars, hbs};