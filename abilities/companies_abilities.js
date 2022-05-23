const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const roles = require('./roles');
const { Technique, User } = require('../models/associate');
const { Company } = require('../services/company_service');

function authorize(abilityName, failureRedirect = 'back') {
  return async (req, res, next) => {
    if (await companyAuthorise(req, abilityName)) {
      return next();
    } else {
      res.redirect(failureRedirect);
    }
  };
}

async function companyAuthorise(req, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  let company = subject('Company', { userId: authUser.id });
  const { params } = req;

  if (params.id) {
    company = await Company.findOne({ where: { id: parseInt(params.id) } });
  }

  const ability = await abilities(authUser, authUser.id);
  return ability.can(abilityName, company)
}

let abilities = async (user, authUserId) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role.title == roles.TECHNIQUE_OWNER) {
    can('read', 'Company');
  } else if (user.role.title == roles.COMPANY_OWNER) {
    can('read', 'Company');
    can('manage', 'Company', { userId: authUserId });
  }

  return new Ability(rules);
};

module.exports = {
  abilities, companyAuthorise, subject, authorize,
};
