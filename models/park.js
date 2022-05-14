const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Park extends Model {
    static associate(models) {
      if (models.company) Park.belongsTo(models.company, { as: 'company' });
      if (models.place) Park.hasMany(models.place, { as: 'places', foreignKey: 'parkId', onDelete: 'CASCADE' });
    }
  }
  Park.init({
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Park',
  });
  return Park;
};
