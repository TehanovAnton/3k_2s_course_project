const { Role } = require('../models/associate');

const rolesRouter = require('express').Router();

rolesRouter.get('/roles', async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
});

rolesRouter.post('/roles', async (req, res) => {
  let body = '';

  req.on('data', (chunk) => { body += chunk.toString(); });
  req.on('end', async () => {
    const object = JSON.parse(body);

    const role = await Role.create({ title: object.title })
      .catch((error) => { res.json(error); });
    res.json(role);
  });
});

rolesRouter.put('/roles/:id', async (req, res) => {
  let body = '';
  const { params } = req;

  req.on('data', (chunk) => { body += chunk.toString(); });
  req.on('end', async () => {
    const object = JSON.parse(body);

    const result = await Role.update(
      { title: object.title },
      { where: { id: params.id }, returning: true, plain: true },
    )
      .catch((error) => { res.json(error); });

    if (result[1]) res.json(result[1]);
    else res.json('role not found or not updated');
  });
});

rolesRouter.delete('/roles/:id', async (req, res) => {
  const { params } = req;

  const role = await Role.findByPk(params.id);
  const result = await Role.destroy(
    {
      where: { id: params.id },
      returning: true,
      plain: true,
    },
  ).catch((error) => { res.json(error); });

  if (result) res.json(role);
  else res.json('role not found');
});

module.exports = rolesRouter;
