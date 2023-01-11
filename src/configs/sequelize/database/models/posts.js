'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.posts.belongsTo(models.users, {foreignKey : 'userId', onDelete: 'CASCADE',
        onUpdate: "NO ACTION"});
    }
  }
  posts.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'posts',
  });

  return posts;
};