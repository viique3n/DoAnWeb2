const Sequelize = require('sequelize');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:nhungdepgai2710@localhost:5432/myinternetbanking';
const db = new Sequelize(connectionString);

module.exports = db;