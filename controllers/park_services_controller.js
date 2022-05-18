const { sequelize } = require('../db/database');
const { ParkService, User, Place, Technique } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');
const _ = require('underscore')

const parkServiceRouter = require('express').Router();

parkServiceRouter.get(
  '/parkservices/index',
  authenticate(),

  async (req, res) => {
    const { user, params } = req;
    const viewBag = {};

    let places = await Place.findAll({
      attributes: ['id'],
      include: [{
        model: Technique,
        as: 'technique',
        where: {userId: user.id},
        required: false,
       }],
    })
    places = _.map(places, place => place.id);
    
    debugger

    viewBag.parkServices = await ParkService.findAll({ 
      where: { placeId:places },
      include: 'work'
    });
    viewBag.addParkServicePath = `/parkservices/${params.placeId}/new`;

    res.render('./parkservices/index', viewBag);
  },
);

parkServiceRouter.get(
  '/parkservices/:placeId/show/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.parkService = await ParkService.findOne({ where: { id: parseInt(params.id), placeId: parseInt(params.placeId) }, include: 'company' });
    viewBag.user = await User.findByPk(req.user.id);
    viewBag.parkServiceEditPath = `/parkservices/${params.placeId}/edit/${params.id}`;
    viewBag.parkServiceDeletePath = `/parkservices/${params.placeId}/delete/${params.id}?_method=DELETE`;

    res.render('./parkservices/show', viewBag);
  },
);

parkServiceRouter.get(
  '/parkservices/:placeId/new',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/parkservices/${params.placeId}/create`;
    viewBag.parkService = {};
    viewBag.company = { id: params.placeId };
    viewBag.buttonLabel = 'Add';

    res.render('./parkservices/new', viewBag);
  },
);

parkServiceRouter.post(
  '/parkservices/:placeId/create',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.create({
      placeId: body.placeId,
      workId: body.workId,
    });

    res.redirect(`/parkservices/${params.placeId}/index`);
  },
);

parkServiceRouter.get(
  '/parkservices/:placeId/edit/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/parkservices/${params.placeId}/update/${params.id}?_method=PUT`;
    viewBag.parkService = await ParkService.findOne({ where: { id: params.id, placeId: params.placeId }, include: 'company' });
    viewBag.company = viewBag.parkService.company;
    viewBag.buttonLabel = 'Update';

    res.render('./parkservices/edit', viewBag);
  },
);

parkServiceRouter.put(
  '/parkservices/:placeId/update/:id',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.update(
      { name: body.name },
      { where: { id: params.id, placeId: params.placeId } },
    );

    res.redirect(`/parkservices/${params.placeId}/show/${params.id}`);
  },
);

parkServiceRouter.delete(
  '/parkservices/:placeId/delete/:id',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await ParkService.destroy({ where: { id: params.id, placeId: params.placeId } });

    res.redirect(`/parkservices/${params.placeId}/index`);
  },
);

module.exports = parkServiceRouter;
