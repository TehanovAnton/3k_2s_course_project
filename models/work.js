const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    static associate(models) {
    }
  }
  Work.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};
