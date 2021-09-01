var path = require('path')
var Sequelize = require('sequelize')
var config = require('../config/config')
var sequelize = new Sequelize(config.dbDatabase, config.dbUserName, config.dbPassword, config)
module.exports = sequelize;
