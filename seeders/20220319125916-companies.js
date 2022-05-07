'use strict';

const { sequelize, DataTypes } = require('../db/database');
const User = require('../models/user')(sequelize, DataTypes);

module.exports = {
  async up (queryInterface, Sequelize) {
    let user = await User.findOne({ where: { email:'techOwn@gmail.com' }, raw:true});

    return queryInterface.bulkInsert('Companies', [{
      name: 'AntonsIndastries',
      email: 'antonsindastries@gmail.com',
      userId: user.id,

      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
