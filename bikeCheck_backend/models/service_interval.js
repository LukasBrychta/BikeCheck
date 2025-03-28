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
        through: models.Components_Service,
        foreignKey: 'service_id',
        otherKey: 'component_id',
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
    description: {
      allowNull: true,
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    modelName: 'Service_Interval',
  });
  return Service_Interval;
};