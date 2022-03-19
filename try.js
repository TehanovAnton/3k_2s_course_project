const DataTypes = require('sequelize').DataTypes;
const { sequelize } = require('./db/database');

const Role = require('./models/role')(sequelize, DataTypes);

func = async () => {
    let roles = await Role.findOne({raw:true})
    console.log(roles);
}

func()