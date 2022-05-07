const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      if (models.parkService) {
        Schedule.belongsTo(models.parkService, {
          foreignKey: 'schedulableId',
          constraints: false,
        });
      }
    }
  }
  Schedule.init({
    schedulableId: DataTypes.INTEGER,
    schedulableType: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Schedule',
  });

  Schedule.addHook('afterFind', (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.commentableType === 'ParkService' && instance.ParkService !== undefined) {
        instance.commentable = instance.image;
      }

      // To prevent mistakes:
      delete instance.ParkService;
      delete instance.dataValues.ParkService;
    }
  });

  return Schedule;
};
