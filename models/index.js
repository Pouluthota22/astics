"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require('../config/config')
var sequelize = require('./connection');
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "connection.js");
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('../models/user')(sequelize, Sequelize);
db.category = require('../models/category')(sequelize, Sequelize);
db.item = require('../models/item')(sequelize, Sequelize);
db.category.hasMany(db.item, {
    foreignKey: 'categoryId',
    sourceKey:'categoryId'
})
db.item.belongsTo(db.category, {
    foreignKey: 'categoryId'
})
module.exports = db;