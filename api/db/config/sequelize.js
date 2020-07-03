const Sequelize = require('sequelize');

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:0147963@localhost:5432/myinternetbanking';
const db = new Sequelize(connectionString);

module.exports = db;
