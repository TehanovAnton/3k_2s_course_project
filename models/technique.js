'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technique extends Model {
    static associate(models) {
      if (models['user'])
      Technique.belongsTo(models['user'], { as:'user' })
    }
  }
  Technique.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Technique',
  });
  return Technique;
};