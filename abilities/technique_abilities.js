const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const roles = require('./roles');
const { Technique, User } = require('../models/associate');

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await techniqueAuthorise(req, abilityName)) {
      return next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function techniqueAuthorise(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  let technique = subject('Technique', { userId: authUser.id });

  if (req.params.id) {
    technique = await Technique.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUser.id);
  return ability.can(abilityName, technique);
}

let abilities = async (user, authUserId) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('manage', 'Technique', { userId: authUserId });
  }

  return new Ability(rules);
};

module.exports = {
  abilities, techniqueAuthorise, subject, authorize,
};
