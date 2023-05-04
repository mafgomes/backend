const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  HOST: process.env.MYSQLDB_USER,
  USER: process.env.MYSQLDB_HOST,
  PASSWORD: process.env.MYSQLDB_PASSWORD,
  DB: process.env.MYSQLDB_DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
