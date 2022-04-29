'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeId: {
        type: Sequelize.STRING,
        primaryKey: true,
        },
      prateNumber: {
        type: Sequelize.STRING
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