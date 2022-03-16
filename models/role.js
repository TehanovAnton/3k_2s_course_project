const { sequelize } = require('../db/database');
const { Model, Sequelize } = require('../initializers/sequelize');

class Role extends Model {};

function initialize(sequelize)
{
    Role.init(
        { title: { type:Sequelize.STRING, allowNull:false, unique:true } },
        { sequelize, modelName:'Role', tableName:'roles', timestamps: false }
    )
}

module.exports.Role = () => { 
    initialize(sequelize);
    return Role
} 
