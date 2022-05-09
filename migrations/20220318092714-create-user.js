module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        type: Sequelize.STRING,
        unique: true,
        alowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        alowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        alowNull: false,
        onDelete: 'CASCADE',
        references: { model: { tableName: 'Roles' }, key: 'id' },
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
    await queryInterface.dropTable('Users');
  },
};
