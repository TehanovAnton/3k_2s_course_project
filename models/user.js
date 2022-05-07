const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models.role) User.belongsTo(models.role, { as: 'role' });

      if (models.technique) User.hasMany(models.technique, { as: 'techniques', foreignKey: 'userId', onDelete: 'cascade' });

      if (models.company) User.hasMany(models.company, { as: 'companies', foreignKey: 'userId', onDelete: 'cascade' });
    }
  }
  User.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
