import dotenv from "dotenv";

dotenv.config()

module.exports = {
    development: {
        JWT_SECRET: process.env.JWT_SECRET,
        url: process.env.HEROKU_POSTGRESQL_ROSE_URL,
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
        url: process.env.HEROKU_POSTGRESQL_ROSE_URL,
        dialect: "postgres",
        port: process.env.PORT
    },

}
