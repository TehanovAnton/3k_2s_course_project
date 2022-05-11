const {
  Model,
} = require('sequelize');

const roles = require('../abilities/roles');

module.exports = (sequelize, DataTypes) => {  

  class User extends Model {
    static associate(models) {
      if (models.role) User.belongsTo(models.role, { as: 'role' });

      if (models.technique) User.hasMany(models.technique, { as: 'techniques', foreignKey: 'userId', onDelete: 'cascade' });

      if (models.company) User.hasMany(models.company, { as: 'companies', foreignKey: 'userId', onDelete: 'cascade' });
    }

    async isCompanyOwner() {
      const { Role } = require('./associate');
      let role = await Role.findOne({ where:{ id:this.roleId }, raw:true, attributes:['title'] })      
      return role.title == roles.COMPANY_OWNER
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
