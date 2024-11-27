'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Components_Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Components_Activity.init({
    component_id: {
      allowNull: false,
      references: {
        model: 'Components',
        key: 'component_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
    },
    activity_id: {
      allowNull: false,
      references: {
        model: 'Activities',
        key: 'activity_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Components_Activity',
  });
  return Components_Activity;
};