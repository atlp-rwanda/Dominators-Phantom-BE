'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      routeId: {
<<<<<<< HEAD
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
=======
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
>>>>>>> develop
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
<<<<<<< HEAD
=======

      coordinates: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: false
      },
>>>>>>> develop
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