'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Journeys', {
      journeyId: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      journeyTitle: {
        type: Sequelize.STRING,
      },
      currentLocation: { type: Sequelize.ARRAY(Sequelize.DECIMAL) },
      speed: { type: Sequelize.INTEGER, defaultValue: 60 },
      passengers: { type: Sequelize.INTEGER },
      routeID: { type: Sequelize.STRING },
      driverID: { type: Sequelize.STRING },
      busID: { type: Sequelize.STRING },
      speed: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('Moving', 'Paused', 'Ended'),
        defaultValue: 'Moving',
      },
      trafficStatus: {
        type: Sequelize.ENUM('High', 'Low', 'Medium', 'None'),
        defaultValue: 'None',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Journeys');
  },
};
