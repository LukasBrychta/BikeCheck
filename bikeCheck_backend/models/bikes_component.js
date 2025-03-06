'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bikes_Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bikes_Component.init({
    bike_id: {
      allowNull: false,
      references: {
        model: 'Bike',
        key: 'bike_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.STRING,
    },
    component_id: {
      allowNull: false,
      references: {
        model: 'Component',
        key: 'component_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Bikes_Component',
  });
  return Bikes_Component;
};