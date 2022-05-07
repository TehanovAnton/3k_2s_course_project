const { sequelize, DataTypes } = require('../db/database');

const Role = require('../models/role')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Company = require('../models/company')(sequelize, DataTypes);
const Park = require('../models/park')(sequelize, DataTypes);
const Technique = require('../models/technique')(sequelize, DataTypes)

User.associate({ role:Role, technique:Technique, company:Company })
Company.associate({ user:User, park:Park })
Park.associate({ company:Company })
Technique.associate({ user:User })

module.exports = { Role, User, Company, Park, Technique }