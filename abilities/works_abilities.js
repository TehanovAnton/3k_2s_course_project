const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const { Work, User } = require('../models/associate');
const _ =require('underscore')

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await workAuthorize(req, abilityName)) {
      return next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function workAuthorize(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'companies' });
  const authUserCompaniesIds = _.map(authUser.companies, (company) => company.id);
  let work = subject('Work', { companyId: parseInt(req.params.companyId) });

  if (req.params.id) {
    work = await Work.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUserCompaniesIds);
  return ability.can(abilityName, work);
}

let abilities = async (user, authUserCompaniesIds) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (await user.isTechniqueOwner()) {
    can('read', 'Work');
  } else if (user.isCompanyOwner()) {
    can('manage', 'Work', { companyId: { $in: authUserCompaniesIds } });
    if (authUserCompaniesIds == 0) { can('manage', 'Work'); }
  }

  return new Ability(rules);
};

module.exports = {
  abilities, workAuthorize, subject, authorize,
};
