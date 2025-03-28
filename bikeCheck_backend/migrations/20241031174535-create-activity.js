'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      activity_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      distance: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      duration: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      bike_id: {
        allowNull: false,
        references: {
          model: 'Bikes',
          key: 'bike_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activities');
  }
};