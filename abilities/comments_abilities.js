const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const roles = require('./roles');
const { Comment, User } = require('../models/associate');

function authorize(abilityName) {
  return (req, res, next) => commentAuthorise(req, res, next, abilityName);
}

async function commentAuthorise(req, res, next, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  let comment = subject('Comment', { userId: authUser.id });
  const { params } = req;

  if (params.id) {
    comment = await Comment.findOne({ where: { id: parseInt(params.id) } });
  }
  
  const ability = await abilities(authUser, comment);
  if (ability.can(abilityName, comment)) {
    return next();
  }

  res.send('permission denied');
}

let abilities = async (user, comment) => {
  const { can, rules } = new AbilityBuilder(Ability);

  can('delete', 'Comment', { userId: user.id });

  return new Ability(rules);
};

module.exports = {
  abilities, commentAuthorise, subject, authorize,
};
