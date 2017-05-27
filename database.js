const Sequelize = require('sequelize');

const connectionUrl = 'postgres://istoryup:istoryup@localhost:5432/istoryup';
const database = new Sequelize(connectionUrl);

module.exports = database;
