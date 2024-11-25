'use strict';
const Stored_Component = require('./stored_component');
const Bikes_Component = require('./bikes_component');
const Components_Activity = require('./components_activity');
const Components_Service = require('./components_service');
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
        through: Stored_Component,
      });
      Component.belongsToMany(models.Bike, {
        through: Bikes_Component,
      });
      Component.belongsToMany(models.Activity, {
        through: Components_Activity,
      });
      Component.belongsToMany(models.Service_Interval, {
        through: Components_Service,
      });
    }
  }
  Component.init({
    component_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(40)
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(40)
    },
    usage: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    lifespan: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
  }, {
    sequelize,
    modelName: 'Component',
  });
  return Component;
};