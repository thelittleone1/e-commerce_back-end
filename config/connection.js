require('dotenv').config();
//require('dotenv').config({path:__dirname+'/./../.env'})
const Sequelize = require('sequelize');

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW);
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize("ecommerce_db", "root", "password", {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
