'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,    
        allowNull: false,
      },
      routeId: {
        allowNull: true,
        type: Sequelize.UUID,
        // defaultValue: Sequelize.UUIDV4,
        onDelete: 'SET NULL',
        references: {
          model: 'routes', 
          key: 'routeId'
        }
      },
      prateNumber: {
        type: Sequelize.STRING,
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