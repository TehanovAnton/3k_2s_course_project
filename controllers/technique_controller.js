const bodyParser = require('body-parser')();
const techniqueRouter = require('express').Router();
const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/technique_abilities');
const { Technique } = require('../models/associate');

techniqueRouter.get(
  '/technique',
  async (req, res) => {
    res.json(await Technique.findAll({ raw: true }));
  },
);

techniqueRouter.get(
  '/technique/index',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
    viewBag.technique = await Technique.findAll({ where: { userId: req.user.id }, raw: true });

    res.render('./technique/index', viewBag);
  },
);

techniqueRouter.get(
  '/technique/new',
  authenticate(),
  authorize('create'),
  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
    viewBag.user = req.user;
    viewBag.techniqueNewPath = '/technique/create';
    viewBag.method = 'POST';
    viewBag.buttonLabel = 'Add';

    res.render('./technique/new', viewBag);
  },
);
techniqueRouter.post(
  '/technique/create',
  authenticate(),
  authorize('create'),
  bodyParser,

  async (req, res) => {
    const { body } = req;

    await Technique.create({
      name: body.name,
      userId: req.user.id,
    });

    res.redirect('/technique/index');
  },
);

techniqueRouter.get(
  '/technique/:id/show',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }
    viewBag.technique = await Technique.findOne({ where: { id: parseInt(req.params.id) }, raw: true });
    viewBag.techniqueEditPath = `/technique/${req.params.id}/edit`;
    viewBag.techniqueDeletePath = `/technique/${req.params.id}/delete?_method=DELETE`;

    res.render('./technique/show', viewBag);
  },
);

techniqueRouter.get(
  '/technique/:id/edit',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.technique = await Technique.findOne({ where: { id: req.params.id }, raw: true });
    viewBag.techniqueUpdatePath = `/technique/${viewBag.technique.id}/update/?_method=PUT`;
    viewBag.method = 'PUT';
    viewBag.buttonLabel = 'Edit';

    res.render('./technique/edit', viewBag);
  },
);
techniqueRouter.put(
  '/technique/:id/update',
  authenticate(),
  authorize('update'),
  bodyParser,

  async (req, res) => {
    const { body } = req;

    await Technique.update(
      {
        name: body.name,
      },
      { where: { id: req.params.id } },
    );

    res.redirect(`/technique/${req.params.id}`);
  },
);

techniqueRouter.delete(
  '/technique/:id/delete',
  authenticate(),
  authorize('deltete'),

  async (req, res) => {
    await Technique.destroy({ where: { id: req.params.id } });

    res.redirect('/technique/index');
  },
);

module.exports = techniqueRouter;
