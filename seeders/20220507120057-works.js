module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Works', [{
      name: 'cleaning',

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Works', null, {});
  },
};
