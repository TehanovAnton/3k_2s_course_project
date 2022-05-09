const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule,
} = require('./models/associate');

const destroyTechnique = async () => await Technique.destroy({ where: { id: 2 } });
destroyTechnique();

// console.log(application.get('env'));
