'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Components_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Components_Service.init({
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
    service_id: {
      allowNull: false,
      references: {
        model: 'Service_Interval',
        key: 'service_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Components_Service',
  });
  return Components_Service;
};