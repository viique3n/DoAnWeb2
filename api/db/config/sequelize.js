const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const connectionString =
  process.env.DATABASE_URL || process.env.CONNECTION_STRING;
const db = new Sequelize(connectionString);

module.exports = db;
