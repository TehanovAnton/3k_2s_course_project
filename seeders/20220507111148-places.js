const { Park, Technique } = require('../models/associate');

module.exports = {
  async up(queryInterface, Sequelize) {
    const park = await Park.findOne({ attributes: ['id'] });
    const technique = await Technique.findOne({ attributes: ['id'] });

    return queryInterface.bulkInsert('Places', [{
      parkId: park.id,
      techniqueId: technique.id,

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Places', null, {});
  },
};
