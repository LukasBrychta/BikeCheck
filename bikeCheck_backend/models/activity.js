'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.Bike, {
        foreignKey: 'bike_id',
      });
      Activity.belongsToMany(models.Component, {
        through: 'Components_Activities',
        foreignKey: 'activity_id'
      });
    }
  }
  Activity.init({
    distance: DataTypes.DECIMAL,
    duration: DataTypes.DECIMAL,
    bike_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};