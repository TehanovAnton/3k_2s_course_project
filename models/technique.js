const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Technique extends Model {
    static associate(models) {
      if (models.user) Technique.belongsTo(models.user, { as: 'user' });

      if (models.place) { Technique.hasOne(models.place, { as: 'place', foreignKey: 'techniqueId', onDelete: 'CASCADE' }); }
    }
  }
  Technique.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Technique',
  });
  return Technique;
};
