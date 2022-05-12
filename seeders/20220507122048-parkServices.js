const { Work, Place } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const company = await Work.findOne({ raw: true, attributes: ['id'] });
    const place = await Place.findOne({ raw: true, attributes: ['id'] });

    return queryInterface.bulkInsert('ParkServices', [{
      placeId: place.id,
      workId: company.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ParkServices', null, {});
  },
};
