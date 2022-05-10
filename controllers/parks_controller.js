const { Park } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');

const Service = require('../services/service').Service(Park);
const parksRouter = require('express').Router();

parksRouter.get(
  '/parks/:companyId/index',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};
    viewBag.parks = await Park.findAll({
      where: { companyId: parseInt(params.companyId) },
      include: 'company',
    });
    viewBag.newParkPath = `/parks/${params.companyId}/new`;

    res.render('./parks/index', viewBag);
  },
);

parksRouter.get(
  '/parks/:companyId/new',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/parks/${params.companyId}/create`;
    viewBag.buttonLabel = 'Create';
    viewBag.park = {};
    viewBag.company = { id: parseInt(params.companyId) };

    res.render('./parks/new', viewBag);
  },
);

parksRouter.post(
  '/parks/:companyId/create',

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

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.park = await Park.findOne({
      where: { id: parseInt(params.id), companyId: parseInt(params.companyId) },
      include: 'company',
    });
    viewBag.editParkPath = `/parks/${params.companyId}/edit/${params.id}`;
    viewBag.deleteParkPath = `/parks/${params.companyId}/delete/${params.id}?_method=DELETE`;

    res.render('./parks/show', viewBag);
  },
);

parksRouter.get(
  '/parks/:companyId/edit/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

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

  async (req, res) => {
    const { params } = req;
    const park = await Park.destroy({ where: { id: parseInt(params.id), companyId: parseInt(params.companyId) } });

    res.redirect(`/parks/${params.companyId}/index`);
  },
);

module.exports = parksRouter;
