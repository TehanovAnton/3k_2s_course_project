const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule, Park, Place
} = require('./models/associate');

const destroyTechnique = async () => await Technique.destroy({ where: { id: 2 } });

const allParks = async () => { console.log(await Park.findOne({ include: 'company' })); };

const companyParkServices = async () => { console.log(await ParkService.findAll({ where: { companyId: 2 }, include: 'company' })); };

const userRoleCheck = async () => {
  const user = await User.findOne();
  console.log(`Check: ${await user.isCompanyOwner()}`);
};

const userPlace = async () => {
  let places = await Place.findAll({
    include: [{
      model: Technique,
      as: 'technique',
      where: {userId: 3},
      required: false,
     }]
  })

  console.log(places);
} 

const parkServiceSchedule = async () => {
  parkservice = await ParkService.findOne()
  await parkservice.createSchedule({ startDate:Date.now(), endDate:Date.now(), schedulableId: parkservice.id, schedulableType: ParkService.name })

  parkservice = await ParkService.findOne({ include:'schedules' })
  console.log(await parkservice.parkservice);
}

const destroyParkService = async () => {
  parkservice = await ParkService.findOne()
  await parkservice.destroy()
  console.log(await Schedule.findAll());
}

destroyParkService()

// console.log(application.get('env'));
