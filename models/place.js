const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      if (models.technicue) {
        Place.belongsTo(
          models.technicue,
          {
            as: 'technique',
            foreignKey: 'techniqueId',
          },
        );
      }
    }
  }
  Place.init({
    parkId: DataTypes.INTEGER,
    techniqueId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};
