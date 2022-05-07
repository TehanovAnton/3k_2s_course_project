'use strict';

const { sequelize, DataTypes } = require('../db/database');
const Role = require('../models/role')(sequelize, DataTypes);

module.exports = {
  async up (queryInterface, Sequelize) {
    let technics_owner = await Role.findOne({ where:{ title:'technics_owner' } , raw:true })
    let company_owner = await Role.findOne({ where:{ title:'company_owner' } , raw:true })
    
    return queryInterface.bulkInsert('Users', [{
      nickname: 'techOwn',
      email: 'techOwn@gmail.com',
      password: 'ewqqwe',
      roleId: technics_owner.id,  

      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
