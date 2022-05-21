const { Company, Work, User, Comment } = require('../models/associate');
const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/works_abilities');
const worksRouter = require('express').Router();

worksRouter.get(
  '/works/:companyid',

  async (req, res) => {
    const viewBag = {};
    viewBag.companies = await Company.findAll({ raw: true });

    res.json(viewBag.companies);
  },
);

worksRouter.get(
  '/works/:companyId/index',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.works = await Work.findAll({ where: { companyId: params.companyId }, raw: true });
    viewBag.user = await User.findByPk(req.user.id);
    viewBag.company = await Company.findByPk(params.companyId);
    viewBag.userOwnCompany = await viewBag.user.hasCompany(viewBag.company);
    viewBag.newWorkPath = `/works/${viewBag.company.id}/new`;

    res.render('./works/index', viewBag);
  },
);

worksRouter.get(
  '/works/:companyId/new',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.path = `/works/${params.companyId}/create`;
    viewBag.work = {};
    viewBag.company = await Company.findByPk(params.companyId);
    viewBag.user = req.user;
    viewBag.buttonLabel = 'Create Work';

    res.render('./works/new', viewBag);
  },
);

worksRouter.post(
  '/works/:companyId/create',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params, body } = req;

    await Work.create({
      name: body.name,
      companyId: parseInt(body.companyId),
    });

    res.redirect(`/works/${body.companyId}/index`);
  },
);

worksRouter.get(
  '/works/:companyId/show/:id',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.user = await User.findByPk(req.user.id);

    viewBag.work = await Work.findOne({
      where: { 
        id: params.id,
        companyId: params.companyId
      },
      include: ['company', {
        model: Comment,
        as: 'comments',
        include: 'author'        
      }]});

    viewBag.userOwnCompany = await viewBag.user.hasCompany(viewBag.work.company);
    viewBag.editWorkPath = `/works/${viewBag.work.company.id}/edit/${viewBag.work.id}`;
    viewBag.deleteWorkPath = `/works/${viewBag.work.company.id}/delete/${viewBag.work.id}?_method=DELETE`;
    viewBag.workType = Work.name;

    res.render('./works/show', viewBag);
  },
);

worksRouter.get(
  '/works/:companyId/edit/:id',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params } = req;
    const viewBag = {};

    viewBag.work = await Work.findByPk(params.companyId);
    viewBag.company = await Company.findByPk(params.companyId);
    viewBag.user = req.user;
    viewBag.path = `/works/${params.companyId}/update/${params.id}?_method=PUT`;
    viewBag.buttonLabel = 'Update Work';

    res.render('./works/edit', viewBag);
  },
);

worksRouter.put(
  '/works/:companyId/update/:id',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params } = req;
    const { body } = req;

    await Work.update({ name: body.name }, { where: { id: params.id } });

    res.redirect(`/works/${params.companyId}/show/${params.id}`);
  },
);

worksRouter.delete(
  '/works/:companyId/delete/:id',
  authenticate(),
  authorize('delete'),

  async (req, res) => {
    const { params } = req;

    await Work.destroy({ where: { id: params.id } });

    res.redirect(`/works/${params.companyId}/index`);
  },
);

module.exports = worksRouter;
