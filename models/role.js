const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
    }
  }
  Role.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  
  return Role;
};
