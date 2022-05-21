const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const _ = require('underscore');
const { ParkService, User, Place, Technique, Park } = require('../models/associate');

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await parkServiceAuthorize(req, abilityName)) {
      next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function parkServiceAuthorize(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id } });

  const authUserPlacesIds = await Place.findAll({
    attributes: ['id'],
    include: [
      { model:Technique, as:'technique', where:{ userId:authUser.id } }
    ]
  })
  authUserPlacesIds = _.map(authUserPlacesIds, place => place.id )

  const companyPlacesIds = await Place.findAll({
    attributes: ['id'],
    include: [
      { model:Park, as:'park', where:{ companyId:req.params.companyId } }
    ]
  })
  companyPlacesIds = _.map(companyPlacesIds, place => place.id )

  let park = subject('Park', { companyId: authUser.id });

  if (req.params.id) {
    park = await Park.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUserCompaniesIds);
  return ability.can(abilityName, park);
}

let abilities = async (user, authUserPacesIds, companyPlacesIds) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('manage', 'ParkSrvices', { placeId: { $in: authUserPacesIds } });
  } else if (user.isCompanyOwner()) {
    can('read', 'ParkSrvices', { placeId: companyPlacesIds });
  }

  return new Ability(rules);
};

module.exports = {
  abilities, parkServiceAuthorize, subject, authorize,
};
