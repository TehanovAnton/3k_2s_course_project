'use strict';

const { sequelize, DataTypes } = require('../db/database');
const Role = require('../models/role')(sequelize, DataTypes);

module.exports = {
  async up (queryInterface, Sequelize) {
    let role = await Role.findOne({ raw:true })

    return queryInterface.bulkInsert('Users', [{
      nickname: 'anton',
      email: 'tehanovanton@gmail.com',
      password: 'ewqqwe',
      role_id: role.id,

      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
