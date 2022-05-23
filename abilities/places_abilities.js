const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const _ = require('underscore')
const { Place, User, Technique } = require('../models/associate');

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await placeAuthorise(req, abilityName)) {
      return next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function placeAuthorise(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  const userTechniqueIds = _.map(await Technique.findAll({ where: { userId: authUser.id } }), technique => technique.id)
  let place = subject('Place', { techniqueId:-1 });

  if (req.params.id) {
    place = await Place.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, userTechniqueIds);
  return ability.can(abilityName, place);
}

let abilities = async (user, userTechniqueIds) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('manage', 'Place', { techniqueId: { $in:userTechniqueIds } });
    can('manage', 'Place', { techniqueId: { $in:[-1] } });
  } else if (await user.isCompanyOwner()) {
    can('read', 'Place');
  }

  return new Ability(rules);
};

module.exports = {
  abilities, placeAuthorise, subject, authorize,
};
