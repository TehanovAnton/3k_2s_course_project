const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const _ = require('underscore');
const { ParkService, User } = require('../models/associate');

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
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'companies' });
  const authUserCompaniesIds = _.map(authUser.companies, (company) => company.id);
  let park = subject('Park', { companyId: authUser.id });

  if (req.params.id) {
    park = await Park.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUserCompaniesIds);
  return ability.can(abilityName, park);
}

let abilities = async (user, authUserCompaniesIds) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('read_all', 'ParkSrvices');
    can('read', 'ParkSrvices');
  } else if (user.isCompanyOwner()) {
    can('manage', 'ParkSrvices', { companyId: { $in: authUserCompaniesIds } });
  }

  return new Ability(rules);
};

module.exports = {
  abilities, parkServiceAuthorize, subject, authorize,
};
