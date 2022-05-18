const { sequelize } = require('../db/database');
const { ParkService, User, Park, Place, Technique, Company, Work } = require('../models/associate');
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

    viewBag.parkServices = await ParkService.findAll({ 
      where: { placeId:places },
      include: [
        'work',
        'schedules',
        { model: Place, as: 'place', include: ['park', 'technique'] },
      ]
    });

    viewBag.addParkServicePath = `/parkservices/${params.placeId}/new`;

    res.render('./parkservices/index', viewBag);
  },
);

parkServiceRouter.get(
  '/parkservices/:companyId/show/:id',
  authenticate(),

  async (req, res) => {
    const { params, user } = req;
    const viewBag = {};

    viewBag.parkService = await ParkService.findOne({
      where: { id: params.id, placeId: params.companyId },
      include: [{ 
        model: Place, as: 'place', include: [{
          model: Park, as: 'park', include: 'company',
        }]          
      }]
    });

    viewBag.user = await User.findByPk(user.id)
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

    viewBag.places = await Place.findAll({
      include: [
        { model: Technique, as: 'technique', where: { userId: req.user.id } },
        { model: Park, as: 'park', where: { companyId: params.companyId }, include: 'company' },
      ]
    });

    viewBag.works = await Work.findAll({
      include: [{ model: Company, as: 'company', where: {userId: req.user.id} }]
    });

    viewBag.path = `/parkservices/${params.companyId}/create`;
    viewBag.parkService = {};
    viewBag.buttonLabel = 'Add';

    res.render('./parkservices/new', viewBag);
  },
);

parkServiceRouter.post(
  '/parkservices/:companyId/create',
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    debugger

    let parkservice = await ParkService.create({
      placeId: body.placeId,
      workId: body.workId,
    });

    parkservice.createSchedule({
      startDate:Date.now(), 
      endDate:Date.now(), 
      schedulableId: parkservice.id, 
      schedulableType: ParkService.name
    })

    res.redirect(`/parkservices/index`);
  },
);

parkServiceRouter.get(
  '/parkservices/:companyId/edit/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.places = await Place.findAll({
      include: [
        { model: Park, as: 'park', where: { companyId: params.companyId }, include: 'company' },
      ]
    });

    viewBag.works = await Work.findAll({
      include: [{ model: Company, as: 'company', where: {userId: req.user.id} }]
    });
    
    viewBag.parkService = await ParkService.findOne({ where: { id: params.id, placeId: params.placeId }, include: 'company' });
    viewBag.path = `/parkservices/${params.companyId}/update/${params.id}?_method=PUT`;
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
