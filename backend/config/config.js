const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "mariadb",
    "password": process.env.DB_PASSWORD,
    "database": "mariadb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "mariadb",
    "password": process.env.DB_PASSWORD,
    "database": "mariadb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "mariadb",
    "password": process.env.DB_PASSWORD,
    "database": "mariadb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
