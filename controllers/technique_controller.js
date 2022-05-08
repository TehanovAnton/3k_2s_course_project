const bodyParser = require('body-parser')();
const techniqueRouter = require('express').Router();
const { authenticate } = require('../services/authentication_service');
const { Technique }  = require('../models/associate')

techniqueRouter.get(
  '/technique',
  async function(req, res) {
    res.json(await Technique.findAll({ raw: true }));
  }
)


techniqueRouter.get(
  '/technique/index',
  async function(req, res) {
    let viewBag = {}
    viewBag.technique = await Technique.findAll({ raw:true })

    res.render('./technique/index', viewBag);
  }
)


techniqueRouter.get(
  '/technique/:id',
  async function(req, res) {
    let viewBag = {}
    viewBag.technique = await Technique.findOne({ where: { id: req.params.id }, raw:true })
    viewBag.techniqueEditPath = `/technique/${req.params.id}/edit`

    res.render('./technique/show', viewBag);
  }
)


techniqueRouter.get(
  '/technique/new',
  async function(req, res) {
    let viewBag = {}
    viewBag.user = req.user
    viewBag.techniqueNewPath = '/technique/create'
    viewBag.method = 'POST'
    viewBag.buttonLabel = 'Add'

    res.render('./technique/new', viewBag);
  }
)
techniqueRouter.post(
  '/technique/create',
  bodyParser,
  async function(req, res) {
    const { body } = req;

    await Technique.create({
      name: body.name,
      userId: req.user.id,
    })

    res.redirect('/technique/index')
  }
)


techniqueRouter.get(
  '/technique/:id/edit',
  async function(req, res) {
    let viewBag = {}

    viewBag.technique = await Technique.findOne({ where: { id: req.params.id }, raw:true })
    viewBag.techniqueUpdatePath = `/technique/${viewBag.technique.id}/update/?_method=PUT`
    viewBag.method = 'PUT'
    viewBag.buttonLabel = 'Edit'

    res.render('./technique/edit', viewBag);
  }
)
techniqueRouter.put(
  '/technique/:id/update',
  bodyParser,
  async function(req, res) {
    const { body } = req;

    await Technique.update({
      name: body.name,
    },
    { where:{ id:req.params.id } })

    res.redirect(`/technique/${req.params.id}`)
  }
)

module.exports = techniqueRouter;
