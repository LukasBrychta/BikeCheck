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
        through: models.Stored_Component,
        foreignKey: 'component_id',
        otherKey: 'user_id',
      });
      Component.belongsToMany(models.Bike, {
        through: models.Bikes_Component,
        foreignKey: 'component_id',
        otherKey: 'bike_id',
      });
      Component.belongsToMany(models.Activity, {
        through: models.Components_Activity,
        foreignKey: 'component_id',
        otherKey: 'activity_id',
      });
      Component.belongsToMany(models.Service_Interval, {
        through: models.Components_Service,
        foreignKey: 'component_id',
        otherKey: 'service_id',
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
      type: DataTypes.STRING(25)
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    usage: {
      allowNull: true,
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