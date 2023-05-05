const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_ROOT_USER,
  PASSWORD: process.env.DB_ROOT_PASSWORD,
  DB: process.env.DB_IESB_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
