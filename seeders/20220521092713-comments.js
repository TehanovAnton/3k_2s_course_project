'use strict';

const { Work, User } = require("../models/associate");
const _ = require("underscore");

module.exports = {
  async up (queryInterface, Sequelize) {
    const work = await Work.findOne();
    const user = await User.findOne();
    let commets = [];

    _.times(5, () => {
      commets.push({
        message: "Good job!",
        userId: user.id,
        commentableType: Work.name,
        commentableId: work.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })

    return queryInterface.bulkInsert('Comments', commets);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
