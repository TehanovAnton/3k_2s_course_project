const { sequelize } = require('../db/database');
const { Model, Sequelize } = require('../initializers/sequelize');

class User extends Model {};

function initialize(sequelize, roleModel)
{
    User.init(
        { 
            nickname: { type:Sequelize.STRING, allowNull:false },
            email: { type:Sequelize.STRING, allowNull:false, unique: true },
            password: { type:Sequelize.STRING, allowNull:false },
            role_id: { 
                type:Sequelize.BIGINT, allowNull:false,
                references:{ model:roleModel, key:'id' }
            }
        },
        { sequelize, modelName:'User', tableName:'users', timestamps: false }
    );

    roleModel.hasMany(User, { as:'users', foreignKey:'id', onDelete:'cascade' })
    User.belongsTo(roleModel, { foreignKey: 'id' });
}

module.exports.User = () => { 
    let Role = require('./role').Role();
    initialize(sequelize, Role);
    return User
};
