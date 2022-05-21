const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    static associate(models) {
      if (models.company) { Work.belongsTo(models.company, { as: 'company' }); }

      if (models.comment) {
        Work.hasMany(models.comment, {
          foreignKey: 'commentableId',
          as: 'comments',
          onDelete: 'CASCADE',
          constraints: false,
          scope: {
            commentableType: 'Work',
          },
        });
      }
    }
  }

  Work.init({
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,    
  }, {
    hooks: {
      beforeDestroy: async (instance, options) => {
        const { Comment } = require('./associate');
        await Comment.destroy({ where:{ commentableId: instance.id, commentableType: Work.name } });
      }
    },
    sequelize,
    modelName: 'Work',
  });

  return Work;
};
