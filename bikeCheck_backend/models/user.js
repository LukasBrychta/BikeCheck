'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Bike, {
        foreignKey: 'user_id',
      });
      User.belongsToMany(models.Component, {
        through: 'Stored_Components',
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    strava_id: DataTypes.INTEGER,
    username: DataTypes.STRING(40),
    email: DataTypes.STRING(40)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};