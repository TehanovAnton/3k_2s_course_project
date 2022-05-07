const DataTypes = require('sequelize').DataTypes;
const { sequelize } = require('./db/database');

const Role = require('./models/role')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);

User.associate({ role:Role })

func = async () => {
    let user = await User.findOne({ include: 'role'})
    console.log(user.role.title);
}

func()

// console.log(application.get('env'));