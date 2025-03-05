'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bikes', {
      bike_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(30)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      distance: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable('Bikes');
  }
};