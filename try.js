const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule, Park,
} = require('./models/associate');

const destroyTechnique = async () => await Technique.destroy({ where: { id: 2 } });

const allParks = async () => { console.log(await Park.findOne({ include: 'company' })); };

const companyParkServices = async () => { console.log(await ParkService.findAll({ where: { companyId: 2 }, include: 'company' })); };

const userRoleCheck = async () => {
  const user = await User.findOne();
  console.log(`Check: ${await user.isCompanyOwner()}`);
};

userRoleCheck();

// console.log(application.get('env'));
