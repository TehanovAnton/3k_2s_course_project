const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkService extends Model {
    static associate(models) {
      if (models.schedule) {
        ParkService.hasOne(models.schedule, {
          foreignKey: 'schedulableId',
          as: 'schedule',
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
    hooks: {
      beforeDestroy: async (instance, options) => {
        const { Schedule } = require('./associate');
        await Schedule.destroy({ where:{ schedulableId: instance.id, schedulableType: ParkService.name } });
      }
    },
    sequelize,
    modelName: 'ParkService',
  });
  return ParkService;
};
