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
        through: 'Bikes_Components',
        foreignKey: 'bike_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Bike.init({
    bike_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING(40),
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bike',
  });
  return Bike;
};