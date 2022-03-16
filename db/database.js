const DB_NAME = 'TechnicsParkService'
const USER_NAME = 'Anton'
const USER_PASSWORD = 'ewqqwe'

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    DB_NAME, USER_NAME, USER_PASSWORD,
    { dialect:'mssql', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

module.exports = { DB_NAME, USER_NAME, USER_PASSWORD, sequelize }