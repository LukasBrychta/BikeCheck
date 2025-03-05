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
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(40)
    },
    access_token: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    refresh_token: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};