
const { sequelize } = require('../db/database');
const { Model, Sequelize } = require('../initializers/sequelize');

class Park extends Model {};

function initialize(sequelize, companyModel)
{
    Park.init(
        { 
            capacity: { type:Sequelize.INTEGER, allowNull:false },
            company_id: { 
                type:Sequelize.BIGINT, allowNull:false,
                references:{ model:companyModel, key:'id' }
            }
        },
        { sequelize, modelName:'Park', tableName:'parks', timestamps: false }
    );

    companyModel.hasMany(Park, { as:'parks', foreignKey:'id', onDelete:'cascade' })
    Park.belongsTo(companyModel, { as:'company', foreignKey:'id' });
}

module.exports.Park = () => { 
    let Company = require('./company').Company();
    initialize(sequelize, Company);
    return Park
};
