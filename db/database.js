const DB_NAME = 'TechnicsParkService_development';
const USER_NAME = 'postgres';
const USER_PASSWORD = 'ewqqwe';
const { Sequelize, DataTypes } = require('sequelize');
const { application } = require('../initializers/express');

const sequelizeByEnv = () => {
  if (application.get('env') == 'development') {
    return new Sequelize(
      DB_NAME,
      USER_NAME,
      USER_PASSWORD,
      {
        dialect: 'postgres',
        pool: {
          max: 5, min: 0, acquire: 30000, idle: 10000,
        },
      },
    );
  }
  if (application.get('env') == 'production') {
    return new Sequelize(
      process.env.DATABASE_URL,
      {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          max: 5, min: 0, acquire: 30000, idle: 10000,
        },
      },
    );
  }
};

const sequelize = sequelizeByEnv();

module.exports = {
  DB_NAME, USER_NAME, USER_PASSWORD, sequelize, DataTypes,
};
