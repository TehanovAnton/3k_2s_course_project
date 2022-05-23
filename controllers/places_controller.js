const placesRouter = require('express').Router();
const { Place, Technique, Park, User } = require('../models/associate');
const { authenticate } = require('../services/authentication_service')
const { authorize } = require('../abilities/places_abilities')

placesRouter.get(
  '/places/:parkId/index',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.places = await Place.findAll({ where:{ parkId:params.parkId }, include:['technique', 'park'] })
    viewBag.orderPlacePath = `/places/${params.parkId}/new`
    viewBag.showPlacePath = (place) => `/places/${params.parkId}/show/${place.id}`

    res.render('./places/index', viewBag)
  }
) 

placesRouter.get(
  '/places/:parkId/show/:placeId',
  authenticate(),
  authorize('read'),

  async (req, res) => {
    const { params, user } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.user = await User.findByPk(user.id)
    viewBag.place = await Place.findOne({ where:{ id:params.placeId }, include:['technique', 'park'] })
    viewBag.userOwnPlace = await viewBag.user.hasPlace(viewBag.place)
    viewBag.editPlacePath = `/places/${params.parkId}/edit/${params.placeId}`
    viewBag.deletePlacePath = `/places/${params.parkId}/delete/${params.placeId}?_method=DELETE`

    res.render('./places/show', viewBag)
  }
)

placesRouter.get(
  '/places/:parkId/new',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params, user } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.park = await Park.findByPk(params.parkId)
    viewBag.techniques = await Technique.findAll({ where:{ userId:user.id } })
    viewBag.path = `/places/${params.parkId}/create`
    viewBag.buttonLabel = 'Order place'

    res.render('./places/new', viewBag)
  }
)

placesRouter.post(
  '/places/:parkId/create',
  authenticate(),
  authorize('create'),

  async (req, res) => {
    const { params, body } = req;

    await Place.create({
      parkId: params.parkId,
      techniqueId: body.techniqueId
    })

    res.redirect(`/places/${params.parkId}/index`)
  }
)

placesRouter.get(
  '/places/:parkId/edit/:placeId',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params, user } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.park = await Park.findByPk(params.parkId)
    viewBag.techniques = await Technique.findAll({ where:{ userId:user.id } })
    viewBag.place = await Place.findOne({ where:{ id:params.placeId }, include:['technique', 'park'] })
    viewBag.path = `/places/${params.parkId}/update/${params.placeId}?_method=PUT`
    viewBag.buttonLabel = 'Update place'

    res.render('./places/new', viewBag)
  }
)

placesRouter.put(
  '/places/:parkId/update/:id',
  authenticate(),
  authorize('update'),

  async (req, res) => {
    const { params, body } = req;

    await Place.update({
      techniqueId: body.techniqueId
    }, {
      where:{ id:params.id }
    })

    res.redirect(`/places/${params.parkId}/index`)
  }
)

placesRouter.delete(
  '/places/:parkId/delete/:id',
  authenticate(),
  authorize('delete'),

  async (req, res) => {
    const { params } = req;

    await Place.destroy({
      where:{ id:params.id }
    })

    res.redirect(`/places/${params.parkId}/index`)
  }
)

module.exports = placesRouter;
