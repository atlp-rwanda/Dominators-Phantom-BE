import dotenv from 'dotenv';

dotenv.config();

module.exports = {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DEV_URL,
    dialect: 'postgres',
    port: process.env.PORT,
<<<<<<< HEAD
    token: process.env.ADMIN_TOKEN
=======
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.TEST_URL,
    dialect: 'postgres',
    port: process.env.PORT,
<<<<<<< HEAD
    token: process.env.ADMIN_TOKEN
=======
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.PROD_URL,
    dialect: 'postgres',
    port: process.env.PORT,
<<<<<<< HEAD
    token: process.env.ADMIN_TOKEN
  }
};
=======
    development: {
        JWT_SECRET: process.env.JWT_SECRET,
        url: process.env.DEV_URL,
        dialect: "postgres",
        port: process.env.PORT
    },
    test: {
        JWT_SECRET: process.env.JWT_SECRET,
        url: process.env.TEST_URL,
        dialect: "postgres",
        port: process.env.PORT
    },
    production: {
        JWT_SECRET: process.env.JWT_SECRET,
        url: process.env.PROD_URL,
        dialect: "postgres",
        port: process.env.PORT
    },
  
}
>>>>>>> d88ba07... Translated i18next
=======
  },
};
>>>>>>> f1fa83b... Added login feature, jwt on a succesful login and documentation
