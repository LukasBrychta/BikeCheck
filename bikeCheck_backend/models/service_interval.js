'use strict';
const Components_Service = require('./components_service');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service_Interval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service_Interval.belongsToMany(models.Component, {
        through: Components_Service,
      });
    }
  }
  Service_Interval.init({
    service_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    last_service: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    next_service: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Service_Interval',
  });
  return Service_Interval;
};