'use strict';
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
        through: 'Components_Services',
        foreignKey: 'service_id',
      });
    }
  }
  Service_Interval.init({
    last_service: DataTypes.DATE,
    next_service: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Service_Interval',
  });
  return Service_Interval;
};