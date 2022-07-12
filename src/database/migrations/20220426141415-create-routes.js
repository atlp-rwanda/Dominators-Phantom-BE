'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      routeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        references: {
          model: 'routes', 
          key: 'routeId'
        }
      },
      origin: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("pending", "active", "disabled"),
        defaultValue: "pending",
      },
      routeSlug: {
        type: Sequelize.STRING,
        unique: true
      },

      fromCoordinates: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: false
      },
      toCoordinates: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: false
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
    await queryInterface.dropTable('routes');
  }
};