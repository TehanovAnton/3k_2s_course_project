const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule,
} = require('./models/associate');

ParkService.findOne()
  .then((parkService) => {
    parkService.createSchedule({
      schedulableId: parkService.id,
      schedulableType: ParkService.name,
      startDate: new Date(2022, 6, 2),
      endDate: new Date(2022, 6, 12),
    });

    parkService.getSchedules()
      .then((schedules) => {
        console.log(schedules);
      });
  });

// console.log(application.get('env'));
