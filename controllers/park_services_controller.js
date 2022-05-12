const { ParkService, Company, User } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');

const parkServiceRouter = require('express').Router();

parkServiceRouter.get(
  '/parkservices/:companyId/index',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};
    viewBag.parkServices = await ParkService.findAll({ where: { companyId: params.companyId }, include: 'company' });
    viewBag.addParkServicePath = `/parkservices/${params.companyId}/new
    `;
    res.render('./parkservices/index', viewBag);
  },
);

parkServiceRouter.get(
  '/parkservices/:companyId/show/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.parkService = await ParkService.findOne({ where: { id: parseInt(params.id), companyId: parseInt(params.companyId) }, include: 'company' });
    viewBag.user = await User.findByPk(req.user.id);
    viewBag.parkServiceEditPath = `/parkservices/${params.companyId}/edit/${params.id}`;
    viewBag.parkServiceDeletePath = `/parkservices/${params.companyId}/delete/${params.id}?_method=DELETE`;

    res.render('./parkservices/show', viewBag);
  },
);

parkServiceRouter.get(
  '/parkservices/:companyId/new',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/parkservices/${params.companyId}/create`;
    viewBag.parkService = {};
    viewBag.company = { id: params.companyId };
    viewBag.buttonLabel = 'Add';

    res.render('./parkservices/new', viewBag);
  },
);

parkServiceRouter.post(
  '/parkservices/:companyId/create',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.create({
      name: body.name,
      companyId: body.companyId,
    });

    res.redirect(`/parkservices/${params.companyId}/index`);
  },
);

parkServiceRouter.get(
  '/parkservices/:companyId/edit/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/parkservices/${params.companyId}/update/${params.id}?_method=PUT`;
    viewBag.parkService = await ParkService.findOne({ where: { id: params.id, companyId: params.companyId }, include: 'company' });
    viewBag.company = viewBag.parkService.company;
    viewBag.buttonLabel = 'Update';

    res.render('./parkservices/edit', viewBag);
  },
);

parkServiceRouter.put(
  '/parkservices/:companyId/update/:id',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.update(
      { name: body.name },
      { where: { id: params.id, companyId: params.companyId } },
    );

    res.redirect(`/parkservices/${params.companyId}/show/${params.id}`);
  },
);

parkServiceRouter.delete(
  '/parkservices/:companyId/delete/:id',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.destroy({ where: { id: params.id, companyId: params.companyId } });

    res.redirect(`/parkservices/${params.companyId}/index`);
  },
);

module.exports = parkServiceRouter;
