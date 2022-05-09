const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkService extends Model {
    static associate(models) {
      if (models.work) ParkService.belongsTo(models.work, { as: 'work' });
      if (models.schedule) {
        ParkService.hasMany(models.schedule, {
          foreignKey: 'schedulableId',
          onDelete: 'CASCADE',
          constraints: false,
          scope: {
            schedulableType: 'ParkService',
          },
        });
      }
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
