const roles = require('./roles')
const { subject } = require('@casl/ability')
const { sequelize, DataTypes } = require('../db/database')
const { AbilityBuilder, Ability } = require('@casl/ability');

const User = require('../models/user')(sequelize, DataTypes),
      Role = require('../models/role')(sequelize, DataTypes)
  
User.associate({ role:Role })


function authorize(abilityName) {
  return (req, res, next) => userAuthorise(req, res, next, abilityName)
}

async function userAuthorise(req, res, next, abilityName) {    
  let authUserUser = await User.findOne({ where:{ id:req.user.id }, include:'role' })
  let user = authUserUser

  if (req.params['id']) {
    user = await User.findOne({ where:{ id:req.params.id }, include:'role' })
  }

  let ability = await abilities(authUserUser, authUserUser.id)
  if (ability.can(abilityName, user)) {
    return next()
  }
  else {
    res.send('permission denied')
  }
}

let abilities = async (user, authUserId) => {  
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role.title == roles.TECHNIQUE_OWNER) {
    can('readAll', 'User', { id: authUserId })  
    can('read', 'User', { id: authUserId })  
    can('delete', 'User', { id: authUserId })
    can('update', 'User', { id: authUserId })
  }
  else if (user.role.title == roles.TECHNIQUE_OWNER) {
    can('read_ability', 'User', { id: authUserId })
    can('read', 'User', { id: authUserId })
  }

  return new Ability(rules)
}

module.exports = { abilities, userAuthorise, subject, authorize }