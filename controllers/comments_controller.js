const { authenticate } = require('../services/authentication_service');
const { authorize } = require('../abilities/comments_abilities');
const commentsRouter = require('express').Router();
const { Comment } = require('../models/associate');

commentsRouter.delete(
  '/comments/:workId/delete/:id',
  authenticate(),
  authorize('delete'),

  async (req, res) => {
    const { params } = req;

    debugger

    await Comment.destroy({ where: { id: params.id } });

    res.redirect('back');
  },
);

module.exports = commentsRouter;
