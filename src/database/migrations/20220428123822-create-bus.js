'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      routeId: {
        type: Sequelize.STRING,
        },
      prateNumber: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      busType: {
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
        
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Buses');
  }
};