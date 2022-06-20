'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    static associate(models) {}
  }
  Journey.init(
    {
      journeyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      journeyTitle: {
        type: DataTypes.STRING,
        defaultValue: 'Motion Started with ID: ' + DataTypes.UUIDV4,
      },
      currentLocation: DataTypes.ARRAY(DataTypes.DECIMAL),
      speed: { type: DataTypes.INTEGER, defaultValue: 60 },
      passengers: DataTypes.INTEGER,
      routeID: DataTypes.STRING,
      driverID: DataTypes.STRING,
      busID: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('Moving', 'Paused', 'Ended'),
        defaultValue: 'Moving',
      },
      trafficStatus: {
        type: DataTypes.ENUM('High', 'Low', 'Medium', 'None'),
        defaultValue: 'None',
      },
      createdAt: { type: DataTypes.DATE, defaultValue: Date.now() },
    },
    {
      sequelize,
      modelName: 'Journey',
    }
  );
  return Journey;
};
