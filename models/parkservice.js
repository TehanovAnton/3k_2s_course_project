const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkService extends Model {
    static associate(models) {
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
      if (models.work) ParkService.belongsTo(models.work, { as: 'work' });
      if (models.place) ParkService.belongsTo(models.place, { as: 'place' });
    }
  }
  ParkService.init({
    placeId: DataTypes.INTEGER,
    workId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ParkService',
  });
  return ParkService;
};
