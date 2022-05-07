module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkServicesPlaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parkServiceId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'ParkServices' }, key: 'id' },
      },
      placeId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Places' }, key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParkServicesPlaces');
  },
};
