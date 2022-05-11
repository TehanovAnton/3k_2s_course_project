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
      if (models.company) ParkService.belongsTo(models.company, { as: 'company' })
    }
  }
  ParkService.init({
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ParkService',
  });
  return ParkService;
};
