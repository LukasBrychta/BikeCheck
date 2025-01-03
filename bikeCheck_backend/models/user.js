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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.belongsToMany(models.Component, {
        through: models.Stored_Component,
        foreignKey: 'user_id',
        otherKey: 'component_id',
      });
    }
  }
  User.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    strava_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(40)
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(40)
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};