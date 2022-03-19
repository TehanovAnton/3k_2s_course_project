'use strict';

const { sequelize, DataTypes } = require('../db/database');
const Company = require('../models/company')(sequelize, DataTypes);

module.exports = {
  async up (queryInterface, Sequelize) {
    let company = await Company.findOne({ where: { email:'antonsindastries@gmail.com' }, raw:true});

    return queryInterface.bulkInsert('Parks', [{
      capacity: 10,
      company_id: company.id,

      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Parks', null, {});
  }
};
