const { Company, User } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');
const companiesRouter = require('express').Router();
const { authorize } = require('../abilities/companies_abilities');

companiesRouter.get(
  '/companies',

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
    viewBag.companies = await Company.findAll({ raw: true });

    res.json(viewBag.companies);
  },
);

companiesRouter.get(
  '/companies/index',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.companies = await Company.findAll({ raw: true });

    let user = await User.findByPk(req.user.id)
    viewBag.companyOwner = await user.isCompanyOwner()

    res.render('./companies/index', viewBag);
  },
);

companiesRouter.get(
  '/companies/new',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
    viewBag.path = '/companies/create';
    viewBag.method = 'POST';
    viewBag.company = {};
    viewBag.user = req.user;
    viewBag.buttonLabel = 'Create Company';

    res.render('./companies/new', viewBag);
  },
);

companiesRouter.get(
  '/companies/:id/show',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.user = req.user;
    viewBag.company = await Company.findOne({ where: { id: parseInt(req.params.id) }, raw: true });
    viewBag.companyEditPath = `/companies/${viewBag.company.id}/edit`;
    viewBag.companyDeletePath = `/companies/${viewBag.company.id}/delete?_method=DELETE`;
    viewBag.parksPath = `/parks/${viewBag.company.id}/index`;
    viewBag.worksPath = `/works/${viewBag.company.id}/index`;
    viewBag.parkServicesPath = `/parkservices/index`;
    viewBag.addParkServicesPath = `/parkservices/${viewBag.company.id}/new`;

    res.render('./companies/show', viewBag);
  },
);

companiesRouter.post(
  '/companies/create',
  authenticate(),
  authorize('create'),

  async (req, res, next) => {
    const { body } = req;
    const company = await Company.create({
      name: body.name,
      email: body.email,
      userId: parseInt(body.userId),
    });

    res.redirect('/companies/index');
  },
);

companiesRouter.get(
  '/companies/:id/edit',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
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
  authorize('update'),

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
  authorize('delete'),

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
