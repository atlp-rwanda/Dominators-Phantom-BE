'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable('routes', {
      id: {
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      origin: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      distance: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('pending', 'active', 'disabled'),
        defaultValue: 'pending',
      },
      routeSlug: {
        type: Sequelize.STRING,
        unique: true,
      },
      coordinates: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  },
};
