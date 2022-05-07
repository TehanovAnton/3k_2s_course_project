module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      capacity: {
        type: Sequelize.INTEGER,
        alowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        alowNull: false,
        references: { model: { tableName: 'Companies' }, key: 'id' },
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
    await queryInterface.dropTable('Parks');
  },
};
