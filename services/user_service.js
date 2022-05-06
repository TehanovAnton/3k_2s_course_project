const { sequelize, DataTypes } = require('../db/database');
const User = require('../models/user')(sequelize, DataTypes);

const userService = {
  userAttributes: Object.keys(User.getAttributes()),

  updateAttributes(params) {
    const paramsKeys = Object.keys(params);

    for (let i = 0; i < paramsKeys.length; i += 1) {
      if (!this.userAttributes.includes(paramsKeys[i])) {
        delete params[paramsKeys[i]];
      }
    }

    return params;
  },
};

module.exports = { userService, User };
