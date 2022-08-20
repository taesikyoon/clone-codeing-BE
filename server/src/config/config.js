import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
<<<<<<< HEAD
    username: "root",
    password: "clone999",
    database: "insta_db",
    host: "instagram-clone.cmfbpxquatib.ap-northeast-2.rds.amazonaws.com",
=======
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
>>>>>>> main
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
