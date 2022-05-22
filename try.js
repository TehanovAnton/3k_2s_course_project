const { sequelize, DataTypes } = require('./db/database');

const {
  Role, User, Technique, ParkService, Schedule, Park, Place, Work, Comment, Company
} = require('./models/associate');

const nodemailer = require('nodemailer')

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

const workAddComments = async () => {
  work = await Work.findOne({ include: 'comments' })
  user = await User.findOne()
  await work.createComment({ message: 'test', commentableId: work.id, commentableType: Work.name, userId: user.id })

  console.log(await Comment.findAll());
  await work.destroy()

  console.log(await Comment.findAll());
}

const sendMail = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "carserviceror@gmail.com",
      pass: "ewqcxzxsw123",
    },
  }, {
    from: 'carserviceror@gmail.com',
  })

  let info = await transporter.sendMail({
    to: "tehanovanton@gmail.com",
    subject: "hello cursach",
    text: "Hello world?",
    html: "<b>Hello cursach?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

sendMail()
