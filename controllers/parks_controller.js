const { Park, User, Company } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/parks_ability');

const parksRouter = require('express').Router();

parksRouter.get(
  '/parks/:companyId/index',
  authenticate(),
  authorize('read_all'),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated() }
    viewBag.parks = await Park.findAll({
      where: { companyId: parseInt(params.companyId) },
      include: 'company',
    });
    viewBag.user = await User.findByPk(req.user.id);
    viewBag.userOwnCompany = await viewBag.user.hasCompany(await Company.findByPk(params.companyId));
    viewBag.newParkPath = `/parks/${params.companyId}/new`;

    res.render('./parks/index', viewBag);
  },
);

parksRouter.get(
  '/parks/:companyId/new',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated() }

    viewBag.path = `/parks/${params.companyId}/create`;
    viewBag.buttonLabel = 'Create';
    viewBag.park = {};
    viewBag.company = { id: parseInt(params.companyId) };

    res.render('./parks/new', viewBag);
  },
);

parksRouter.post(
  '/parks/:companyId/create',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params, body } = req;

    const park = await Park.create({
      address: body.address,
      capacity: body.capacity,
      companyId: body.companyId,
    });

    res.redirect(`/parks/${params.companyId}/index`);
  },
);

parksRouter.get(
  '/parks/:companyId/show/:id',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated() }

    viewBag.user = await User.findByPk(req.user.id);
    viewBag.userIsCompanyOwner = await viewBag.user.isCompanyOwner();
    viewBag.park = await Park.findOne({
      where: { id: parseInt(params.id), companyId: parseInt(params.companyId) },
      include: 'company',
    });
    viewBag.editParkPath = `/parks/${params.companyId}/edit/${params.id}`;
    viewBag.deleteParkPath = `/parks/${params.companyId}/delete/${params.id}?_method=DELETE`;
    viewBag.placesIndexPath = `/places/${params.id}/index`;

    res.render('./parks/show', viewBag);
  },
);

parksRouter.get(
  '/parks/:companyId/edit/:id',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated() }

    viewBag.park = await Park.findOne({
      where: { id: parseInt(params.id), companyId: parseInt(params.companyId) },
      include: 'company',
    });
    viewBag.company = viewBag.park.company;
    viewBag.path = `/parks/${params.companyId}/update/${params.id}?_method=PUT`;
    viewBag.buttonLabel = 'Update';

    res.render('./parks/edit', viewBag);
  },
);

parksRouter.put(
  '/parks/:companyId/update/:id',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params, body } = req;

    const park = await Park.update(
      {
        address: body.address,
        capacity: body.capacity,
      },
      { where: { id: parseInt(params.id), companyId: parseInt(params.companyId) } },
    );

    res.redirect(`/parks/${params.companyId}/show/${params.id}`);
  },
);

parksRouter.delete(
  '/parks/:companyId/delete/:id',
  authenticate(),
  authorize('delete'),

  async (req, res) => {
    const { params } = req;
    const park = await Park.destroy({ where: { id: parseInt(params.id), companyId: parseInt(params.companyId) } });

    res.redirect(`/parks/${params.companyId}/index`);
  },
);

module.exports = parksRouter;
