'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasMany(models.posts, { foreignKey : 'userId'});
    }
  }
  users.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:true
    },
    password_hash: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
      validate: {
        isEmail: true,
      }
    },
    phoneNumber: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['m', 'f']],
          msg: "Must be 'm' or 'f'"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'users'
  });

  return users;
};