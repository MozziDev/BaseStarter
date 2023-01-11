'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const modelPath = process.cwd() + '/src/configs/sequelize/database/models/';
const basename = path.basename(__dirname + '/../src/configs/sequelize/database/models/index.js');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/index.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(modelPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
      const model = require( __dirname + '/../models/' + file)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync().then(()=>console.log("+ DataBase Sync"));
module.exports = db;
