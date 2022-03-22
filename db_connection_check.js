const Sequelize = require('sequelize');
const { DB_NAME, USER_NAME, USER_PASSWORD } = require('./db/database');

const sequelize = new Sequelize(
    DB_NAME, USER_NAME, USER_PASSWORD,
    { dialect:'postgres', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);