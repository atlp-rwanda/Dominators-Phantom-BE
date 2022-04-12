import dotenv from "dotenv";

dotenv.config()

const config= {
    development: {
        port: process.env.DEVPORT,
        DB: process.env.DEVDB,
        JWT_SECRET: process.env.JWT_SECRET
    },
    test: {
        port: process.env.TESTPORT,
        DB: process.env.TESTDB,
        JWT_SECRET: process.env.JWT_SECRET
    }

}
const currentConfig = config[process.env.NODE_ENV];
export default currentConfig;