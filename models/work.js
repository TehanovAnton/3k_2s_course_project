const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    static associate(models) {
      if (models.company) { Work.belongsTo(models.company, { as: 'company' }); }
    }
  }
  Work.init({
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};
