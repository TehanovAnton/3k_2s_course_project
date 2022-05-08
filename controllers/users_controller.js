const bodyParser = require('body-parser')();
const usersRouter = require('express').Router();
const { userService } = require('../services/user_service');
const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/usersAbilies');
const { Role, User } = require('../models/associate')

usersRouter.get(
  '/users',
  authenticate(),
  authorize('readAll'),

  async (req, res) => {
    const users = await User.findAll({ raw: true });
    res.json(users);
  },
);

usersRouter.post(
  '/users/create',
  bodyParser,
  async (req, res) => {
    const { body } = req;
    let role = await Role.findOne({ where: { title: body.role }, attributes: ['id'] });

    const user = await User.create({
      nickname: body.nickname,
      email: body.email,
      password: body.password,
      roleId: role.id,
    }).catch((error) => { res.json(error); });

    res.json(user);
  },
);

usersRouter.put(
  '/users/:id',
  bodyParser,
  authenticate(),
  authorize('update'),
  async (req, res) => {
    const { body } = req;
    const { params } = req;

    const updates = userService.updateAttributes(body);
    const result = await User.update(updates, {
      where: { id: params.id },
      returning: true,
      plain: true,
    })
      .catch((error) => { res.json(error); });

    const updatedUser = result[1];
    if (updatedUser) res.json(updatedUser);
    else res.json('user not found or not updated');
  },
);

usersRouter.delete(
  '/users/:id',
  authenticate(),
  authorize('delete'),

  async (req, res) => {
    const { params } = req;

    const user = await User.findByPk(params.id);
    const result = await User.destroy(
      {
        where: { id: params.id },
        returning: true,
        plain: true,
      },
    ).catch((error) => { res.json(error); });

    if (result) res.json(user);
    else res.json('user not found');
  },
);

module.exports = usersRouter;
