const DataTypes = require('sequelize').DataTypes;
const { sequelize } = require('./db/database');

const Role = require('./models/role')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);

func = async () => {
    let roles = await User.findOne({raw:true})
    console.log(roles);
}

func()