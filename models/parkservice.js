const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkService extends Model {
    static associate(models) {
      if (models.work) ParkService.belongsTo(models.work, { as: 'work' });
    }
  }
  ParkService.init({
    workId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ParkService',
  });
  return ParkService;
};
