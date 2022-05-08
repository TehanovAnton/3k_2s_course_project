const bodyParser = require('body-parser')();
const techniqueRouter = require('express').Router();
const { authenticate } = require('../services/authentication_service');
const { Technique }  = require('../models/associate')

techniqueRouter.get(
  '/technique/index',
  async function(req, res) {
    let viewBag = {}
    viewBag.technique = await Technique.findAll({ raw:true })

    res.render('./technique/index', viewBag);
  }
)

techniqueRouter.get(
  '/technique/new',
  async function(req, res) {
    let viewBag = {}
    viewBag.user = req.user
    viewBag.techniqueNewPath = '/technique/create'

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

module.exports = techniqueRouter;
