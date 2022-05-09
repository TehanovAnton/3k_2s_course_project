const { sequelize, DataTypes } = require('../db/database');
const User = require('../models/user')(sequelize, DataTypes);
const Company = require('../models/company')(sequelize, DataTypes);
const Role = require('../models/role')(sequelize, DataTypes);

module.exports = {
  async up(queryInterface, Sequelize) {
    const technics_owner_role = await Role.findOne({ where: { title: 'technique_owner' } });
    const user = await User.findOne({ where: { roleId: technics_owner_role.id } });
    const company = await Company.findOne();

    return queryInterface.bulkInsert('Techniques', [{
      userId: user.id,
      name: company.name,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Techniques', null, {});
  },
};
