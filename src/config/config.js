import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DEV_URL,
    dialect: 'postgres',
    port: process.env.PORT,
    token: process.env.ADMIN_TOKEN
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.TEST_URL,
    dialect: 'postgres',
    port: process.env.PORT,
    token: process.env.ADMIN_TOKEN
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.PROD_URL,
    dialect: 'postgres',
    port: process.env.PORT,
    token: process.env.ADMIN_TOKEN
  }
};
