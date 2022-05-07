const { sequelize, DataTypes } = require('./db/database');

const { Role, User, Technique } = require('./models/associate');

func = async () => {
  const user = await User.findOne({ where: { nickname: 'techOwn' }, include: 'techniques' });
  console.log(user.techniques);
};

func();

// console.log(application.get('env'));
