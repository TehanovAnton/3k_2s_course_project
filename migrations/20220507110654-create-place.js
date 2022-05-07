module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parkId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'Parks' }, key: 'id' },
      },
      techniqueId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Techniques' }, key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Places');
  },
};
