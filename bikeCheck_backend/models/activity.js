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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Activity.belongsToMany(models.Component, {
        through: 'Components_Activities',
        foreignKey: 'activity_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Activity.init({
    activity_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    distance: DataTypes.DECIMAL,
    duration: DataTypes.DECIMAL,
    bike_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};