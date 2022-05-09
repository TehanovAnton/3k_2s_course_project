module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      title: 'technique_owner',

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'company_owner',

      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
