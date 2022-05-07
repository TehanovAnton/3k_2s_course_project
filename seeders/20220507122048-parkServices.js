const { Work } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const work = await Work.findOne({ where: { name: 'cleaning' } });

    return queryInterface.bulkInsert('ParkServices', [{
      workId: work.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ParkServices', null, {});
  },
};
