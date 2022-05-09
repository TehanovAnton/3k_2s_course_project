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
        onDelete: 'CASCADE',
        references: { model: 'Parks', key: 'id', as: 'parkId' },
      },
      techniqueId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: { tableName: 'Techniques' }, key: 'id', as: 'techniqueId' },
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
