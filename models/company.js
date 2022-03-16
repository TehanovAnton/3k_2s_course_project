
const { sequelize } = require('../db/database');
const { Model, Sequelize } = require('../initializers/sequelize');

class Company extends Model {};

function initialize(sequelize, userModel)
{
    Company.init(
        { 
            name: { type:Sequelize.STRING, allowNull:false },
            email: { type:Sequelize.STRING, allowNull:false, unique: true },
            user_id: { 
                type:Sequelize.BIGINT, allowNull:false,
                references:{ model:userModel, key:'id' }
            }
        },
        { sequelize, modelName:'Company', tableName:'companies', timestamps: false }
    );

    userModel.hasMany(Company, { as:'companies', foreignKey:'id', onDelete:'cascade' })
    Company.belongsTo(userModel, { as:'user', foreignKey:'id' });
}

module.exports.Company = () => { 
    let User = require('./user').User();
    initialize(sequelize, User);
    return Company
};
