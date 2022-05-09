const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Technique extends Model {
    static associate(models) {
      if (models.user) Technique.belongsTo(models.user, { as: 'user' });

      if (models.place) {
        Technique.hasOne(
          models.place,
          {
            onDelete: 'CASCADE',
            as: 'place',
            foreignKey: 'techniqueId',
          },
        );
      }
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
