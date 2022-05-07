const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParkServicesPlaces extends Model {
    static associate(models) {
      if (models.parkService) ParkServicesPlaces.belongsTo(models.parkService, { as: 'parkService' });
      if (models.place) ParkServicesPlaces.belongsTo(models.place, { as: 'place' });
    }
  }
  ParkServicesPlaces.init({
    parkServiceId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ParkServicesPlaces',
  });
  return ParkServicesPlaces;
};
