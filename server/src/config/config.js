import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    username: "root",
    password: "broccoli",
    database: "clone",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
    dialectOptions: {
      timezone: "+09:00",
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
};

export default config;