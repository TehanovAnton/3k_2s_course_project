const { companyService, Company } = require('../services/company_service');
const { authenticate } = require('../services/authentication_service');
const companiesRouter = require('express').Router();
const helpers = require('../helpers/helpers');

companiesRouter.get(
  '/companies/index',
  authenticate(),

  async (req, res) => {
    let viewBag = {};    
    viewBag.companies = await Company.findAll({ raw: true });

    res.render('./companies/index', viewBag);
  }
);

companiesRouter.get('/companies/new', async (req, res) => {
  const companies = await Company.findAll({ raw: true });
  res.render('./companies/new', { companies });
});

companiesRouter.post('/companies/create', async (req, res, next) => {
  const params = req.body;
  console.log(params);
  const company = await Company.create({
    name: params.name,
    email: params.email,
    user_id: parseInt(params.user_id),
  }).catch((error) => { res.json(error); });

  res.redirect(helpers.companiesIndexPath());
});

companiesRouter.get('/companies/:id/edit', async (req, res) => {
  const companies = await Company.findAll({ raw: true });
  const company = await Company.findOne({ raw: true });
  res.render('./companies/edit', { activate: false, companies, company });
});

companiesRouter.post('/companies/:id/update', async (req, res) => {
  const { params } = req;
  const { body } = req;

  const updates = companyService.updateAttributes(body);
  const result = await Company.update(updates, { where: { id: params.id }, returning: true, plain: true })
    .catch((error) => { res.json(error); });

  if (result[1]) res.redirect(helpers.companiesIndexPath());
  else res.json('company not found or not updated');
});

companiesRouter.get('/companies/:id/delete', async (req, res) => {
  const { params } = req;
  const result = await Company.destroy(
    {
      where: { id: params.id },
      returning: true,
      plain: true,
    },
  ).catch((error) => { res.json(error); });

  if (result) res.redirect(helpers.companiesIndexPath());
  else res.json('company not found');
});

module.exports = companiesRouter;
