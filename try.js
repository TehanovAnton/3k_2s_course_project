// const DataTypes = require('sequelize').DataTypes;
// const { sequelize } = require('./db/database');

// const Role = require('./models/role')(sequelize, DataTypes);
// const User = require('./models/user')(sequelize, DataTypes);

// func = async () => {
//     let users = await User.findAll({raw:true})
//     console.log(users);
// }

// func()

const {application} = require('./initializers/express_config');
// console.log(application.get('env'));