const { authenticate } = require('../services/authentication_service');
const commentsRouter = require('express').Router();
const { Comment } = require('../models/associate');

commentsRouter.delete(
  '/comments/:workId/delete/:id',
  authenticate(),

  async (req, res) => {
    const { params } = req;

    debugger

    await Comment.destroy({ where: { id: params.id } });

    res.redirect('back');
  },
);

module.exports = commentsRouter;
