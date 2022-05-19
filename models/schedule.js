const {
  Model,
} = require('sequelize');

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      if (models.parkService) {
        Schedule.belongsTo(models.parkService, {
          foreignKey: 'schedulableId',
          onDelete: 'CASCADE',
          constraints: false,
        });
      }
    }

    formFormat() {
      return moment(this.date).format('YYYY-MM-DDTHH:MM')
    }

    showFormat() {
      return moment(this.date).format('yyyy-mm-D hh:mm')
    }
  }
  Schedule.init({
    schedulableId: DataTypes.INTEGER,
    schedulableType: DataTypes.STRING,
    date: DataTypes.DATE
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
