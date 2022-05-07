const { Place, ParkService } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const place = await Place.findOne({ attributes: ['id'] });
    const parkService = await ParkService.findOne({ attributes: ['id'] });

    return queryInterface.bulkInsert('ParkServicesPlaces', [{
      parkServiceId: parkService.id,
      placeId: place.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ParkServicesPlaces', null, {});
  },
};
