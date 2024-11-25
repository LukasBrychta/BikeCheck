'use strict';
const Components_Activity = require('./components_activity');
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
        through: Components_Activity,
      });
    }
  }
  Activity.init({
    activity_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    distance: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    duration: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    bike_id: {
      allowNull: false,
      references: {
        model: 'Bikes',
        key: 'bike_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};