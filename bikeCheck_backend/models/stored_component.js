'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stored_Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stored_Component.init({
    user_id: {
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.BIGINT
    },
    component_id: {
      allowNull: false,
      references: {
        model: 'Component',
        key: 'component_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Stored_Component',
  });
  return Stored_Component;
};