'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Component.belongsToMany(models.User, {
        through: 'Stored_Components',
        foreignKey: 'component_id',
      });
      Component.belongsToMany(models.Bike, {
        through: 'Bikes_Components',
        foreignKey: 'component_id',
      });
      Component.belongsToMany(models.Activity, {
        through: 'Components_Activities',
        foreignKey: 'component_id',
      });
      Component.belongsToMany(models.Service_Interval, {
        through: 'Components_Services',
        foreignKey: 'component_id',
      });
    }
  }
  Component.init({
    component_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(40),
    type: DataTypes.STRING(40),
    usage: DataTypes.DECIMAL,
    lifespan: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Component',
  });
  return Component;
};