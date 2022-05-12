const { Company } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const company = await Company.findOne({ raw: true, attributes: ['id'] });

    return queryInterface.bulkInsert('Works', [{
      name: 'cleaning',
      companyId: company.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Works', null, {});
  },
};
