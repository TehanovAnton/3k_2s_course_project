const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule, Park,
} = require('./models/associate');

const destroyTechnique = async () => await Technique.destroy({ where: { id: 2 } });

const allParks = async () => { console.log(await Park.findOne({ include: 'company' })); };

allParks();

// console.log(application.get('env'));
