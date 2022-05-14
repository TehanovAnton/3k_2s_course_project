const {
  Model,
} = require('sequelize');
const _ = require('underscore');
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
      const role = await Role.findOne({ where: { id: this.roleId }, raw: true, attributes: ['title'] });
      return role.title == roles.COMPANY_OWNER;
    }

    async isTechniqueOwner() {
      const { Role } = require('./associate');
      const role = await Role.findOne({ where: { id: this.roleId }, raw: true, attributes: ['title'] });
      return role.title == roles.TECHNIQUE_OWNER;
    }

    async hasCompany(company) {
      const { Company } = require('./associate');
      const userCompany = await Company.findOne({ where: { id: company.id, userId: this.id } });

      return !!userCompany;
    }

    async hasPlace(place) {
      const { Place, Technique } = require('./associate');
      const techniquesIds =  _.map(await Technique.findAll({ where: { userId: this.id } }), technique => technique.id);
      const userPlace = await Place.findOne({ where: { id: place.id, techniqueId:techniquesIds } });

      return !!userPlace
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
