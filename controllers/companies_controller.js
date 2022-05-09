const { companyService, Company } = require('../services/company_service');
const { authenticate } = require('../services/authentication_service');
const companiesRouter = require('express').Router();
const helpers = require('../helpers/helpers');

companiesRouter.get(
  '/companies',

  async (req, res) => {
    const viewBag = {};
    viewBag.companies = await Company.findAll({ raw: true });

    res.json(viewBag.companies);
  },
);

companiesRouter.get(
  '/companies/index',
  authenticate(),

  async (req, res) => {
    const viewBag = {};
    viewBag.companies = await Company.findAll({ raw: true });

    res.render('./companies/index', viewBag);
  },
);

companiesRouter.get(
  '/companies/new',
  authenticate(),

  async (req, res) => {
    const viewBag = {};
    viewBag.path = '/companies/create';
    viewBag.method = 'POST';
    viewBag.company = {};
    viewBag.user = req.user;
    viewBag.buttonLabel = 'Create Company';

    res.render('./companies/new', viewBag);
  },
);

companiesRouter.post(
  '/companies/create',
  authenticate(),

  async (req, res, next) => {
    const { body } = req;
    debugger;
    const company = await Company.create({
      name: body.name,
      email: body.email,
      userId: parseInt(body.userId),
    });

    res.redirect('/companies/index');
  },
);

companiesRouter.get(
  '/companies/:id',
  authenticate(),

  async (req, res) => {
    const viewBag = {};
    viewBag.company = await Company.findOne({ where: { id: parseInt(req.params.id) }, raw: true });
    viewBag.companyEditPath = `/companies/${viewBag.company.id}/edit`;
    viewBag.companyDeletePath = `/companies/${viewBag.company.id}/delete?_method=DELETE`;

    res.render('./companies/show', viewBag);
  },
);

companiesRouter.get(
  '/companies/:id/edit',
  authenticate(),

  async (req, res) => {
    const viewBag = {};
    viewBag.company = await Company.findOne({ where: { id: req.params.id }, raw: true });
    viewBag.path = `/companies/${viewBag.company.id}/update?_method=PUT`;
    viewBag.user = req.user;
    viewBag.buttonLabel = 'Update Company';

    res.render('./companies/edit', viewBag);
  },
);

companiesRouter.put(
  '/companies/:id/update',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const { body } = req;

    const updates = companyService.updateAttributes(body);
    await Company.update(updates, { where: { id: params.id } });

    res.redirect(`/companies/${params.id}`);
  },
);

companiesRouter.delete(
  '/companies/:id/delete',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    await Company.destroy(
      {
        where: { id: params.id },
        returning: true,
        plain: true,
      },
    );

    res.redirect('/companies/index');
  },
);

module.exports = companiesRouter;
