module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'Works' }, key: 'id' },
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
    await queryInterface.dropTable('ParkServices');
  },
};
