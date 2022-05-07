const { sequelize, DataTypes } = require('../db/database');
const Company = require('../models/company')(sequelize, DataTypes);

module.exports = {
  async up(queryInterface, Sequelize) {
    const company = await Company.findOne({ where: { email: 'antonsindastries@gmail.com' }, raw: true });

    return queryInterface.bulkInsert('Parks', [{
      capacity: 10,
      companyId: company.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Parks', null, {});
  },
};
