const { subject } = require('@casl/ability');
const { AbilityBuilder, Ability } = require('@casl/ability');
const roles = require('./roles');
const { sequelize, DataTypes } = require('../db/database');
const { Technique } = require('../models/associate');

const User = require('../models/user')(sequelize, DataTypes);
const Role = require('../models/role')(sequelize, DataTypes);

User.associate({ role: Role });

function authorize(abilityName) {
  return (req, res, next) => techniqueAuthorise(req, res, next, abilityName);
}

async function techniqueAuthorise(req, res, next, abilityName) {
  const authUser = await User.findOne({ where: { id: req.user.id }, include: 'role' });
  let technique = subject('Technique', { userId: authUser.id });

  if (req.params.id) {
    technique = await Technique.findOne({ where: { id: req.params.id } });
  }

  const ability = await abilities(authUser, authUser.id);
  if (ability.can(abilityName, technique)) {
    return next();
  }

  res.send('permission denied');
}

let abilities = async (user, authUserId) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role.title == roles.TECHNIQUE_OWNER) {
    can('manage', 'Technique', { userId: authUserId });
  } else if (user.role.title == roles.COMPANY_OWNER) {
  }

  return new Ability(rules);
};

module.exports = {
  abilities, techniqueAuthorise, subject, authorize,
};
