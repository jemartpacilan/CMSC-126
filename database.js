const Sequelize = require('sequelize');

const connectionUrl = 'postgres://istoryUP:istoryUP@localhost:5432/istoryUP';
const database = new Sequelize(connectionUrl);

module.exports = database;
