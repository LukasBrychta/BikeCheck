'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bike.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Bike.hasMany(models.Activity, {
        foreignKey: 'bike_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Bike.belongsToMany(models.Component, {
        through: models.Bikes_Component,
        foreignKey: 'bike_id',
        otherKey: 'component_id',
      });
    }
  }
  Bike.init({
    bike_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(30)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    distance: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    user_id: {
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.BIGINT,
    },
  }, {
    sequelize,
    modelName: 'Bike',
  });
  return Bike;
};