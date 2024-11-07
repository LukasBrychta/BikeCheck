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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Service_Interval.init({
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    last_service: DataTypes.DATE,
    next_service: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Service_Interval',
  });
  return Service_Interval;
};