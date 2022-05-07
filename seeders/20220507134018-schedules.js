const { ParkService } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const parkService = await ParkService.findOne();

    return queryInterface.bulkInsert('Schedules', [{
      schedulableId: parkService.id,
      schedulableType: ParkService.name,
      startDate: new Date(2022, 6, 1),
      endDate: new Date(2022, 6, 10),

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Schedules', null, {});
  },
};
