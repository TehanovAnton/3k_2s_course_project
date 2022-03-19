const DB_NAME = 'TechnicsParkService_development'
const USER_NAME = 'postgres'
const USER_PASSWORD = 'ewqcxzxsw123'

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    DB_NAME, USER_NAME, USER_PASSWORD,
    { dialect:'postgres', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

module.exports = { DB_NAME, USER_NAME, USER_PASSWORD, sequelize, DataTypes }