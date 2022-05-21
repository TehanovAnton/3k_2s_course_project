'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.work, {
        foreignKey: 'commentableId',
        onDelete: 'CASCADE',
        constraints: false,
      });
    }
  }

  Comment.init({
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    commentableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });


  Comment.addHook('afterFind', (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.commentableType === 'Work' && instance.Work !== undefined) {
        instance.commentable = instance.image;
      }

      // To prevent mistakes:
      delete instance.Work;
      delete instance.dataValues.Work;
    }
  });

  return Comment;
};