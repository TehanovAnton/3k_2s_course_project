const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const _ = require('underscore');
const { Park, User } = require('../models/associate');

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await parkAuthorize(req, abilityName)) {
      return next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function parkAuthorize(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'companies' });
  const authUserCompaniesIds = _.map(authUser.companies, (company) => company.id);
  let park = subject('Park', { companyId: parseInt(req.params.companyId) });

  if (req.params.id) {
    park = await Park.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUserCompaniesIds);
  return ability.can(abilityName, park);
}

let abilities = async (user, authUserCompaniesIds) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('read_all', 'Park');
    can('read', 'Park');
  } else if (user.isCompanyOwner()) {
    can('read_all', 'Park');
    can('manage', 'Park', { companyId: { $in: authUserCompaniesIds } });
    if (authUserCompaniesIds == 0) { can('manage', 'Park'); }
  }

  return new Ability(rules);
};

module.exports = {
  abilities, parkAuthorize, subject, authorize,
};
