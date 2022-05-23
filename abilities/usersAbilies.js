const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const { User, Role } = require('../models/associate')

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await userAuthorise(req, res, abilityName)) {
      return next();
    }
    res.redirect(failureRedirect);
  };
}

async function userAuthorise(req, res, abilityName) {
  let authUserUser = user = {};
  if (req.isAuthenticated()) {
    authUserUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  }

  if (req.params.id) {
    user = await User.findOne({ where: { id: parseInt(req.params.id) }, include: 'role' });
  }

  const ability = await abilities(authUserUser, authUserUser.id);
  return ability.can(abilityName, user);
}

let abilities = async (user, authUserId) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (!authUserId) {
    can('create');
  } else {
    can('read', 'User', { id: authUserId });
    can('delete', 'User', { id: authUserId });
    can('update', 'User', { id: authUserId });
  }

  return new Ability(rules);
};

module.exports = {
  abilities, userAuthorise, subject, authorize,
};
