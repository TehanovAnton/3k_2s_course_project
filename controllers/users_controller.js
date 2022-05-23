const bodyParser = require('body-parser')();
const usersRouter = require('express').Router();
const { userService } = require('../services/user_service');
const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/usersAbilies');
const { Role, User } = require('../models/associate');

// out of project goals
usersRouter.get(
  '/users',

  async (req, res) => {
    const users = await User.findAll({ raw: true });
    res.json(users);
  },
);

usersRouter.get(
  '/users/:id/show',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.user = await User.findOne({ where: { id: params.id }, include:'role' });
    viewBag.editUserPath = `/users/${params.id}/edit`;
    viewBag.deleteUserPath = `/users/${params.id}/delete?_method=DELETE`;

    res.render('./users/show', viewBag);
  }
)

usersRouter.get(
  '/users/:id/edit',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    const viewBag = { authenticated: req.isAuthenticated(), showUserPath: `/users/${req.user.id}/show` }

    viewBag.user = await User.findOne({ where: { id: params.id }, include:'role' });
    viewBag.path = `/users/${params.id}/update?_method=PUT`;
    viewBag.buttonLabel = 'Update';

    res.render('./users/edit', viewBag);
  }
)

usersRouter.put(
  '/users/:id/update',
  bodyParser,
  authenticate(),

  async (req, res) => {
    const { params, body } = req;

    await User.update({
      nickname: body.nickname,
      email: body.email,
    }, {
      where: { id: params.id }
    })

    res.redirect(`/users/${params.id}/show`);
  },
);



usersRouter.post(
  '/users/create',
  bodyParser,
  authorize('create'),

  async (req, res) => {
    const { body } = req;
    const role = await Role.findOne({ where: { title: body.role }, attributes: ['id'] });

    const user = await User.create({
      nickname: body.nickname,
      email: body.email,
      password: body.password,
      roleId: role.id,
    }).catch((error) => { res.json(error); });

    res.redirect('/');
  },
);

usersRouter.delete(
  '/users/:id/delete',
  authenticate(),

  async (req, res) => {
    const { params } = req;
    debugger
    await User.destroy({ where: { id: params.id } })

    res.redirect('/logout?_method=DELETE');
  },
);

module.exports = usersRouter;
