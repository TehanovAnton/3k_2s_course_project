'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      if (models['user'])
        Company.belongsTo(models['user'], { as:'user' })

      if (models['park'])
        Company.hasMany(models['park'], { as:'parks' })
    }
  }
  Company.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};