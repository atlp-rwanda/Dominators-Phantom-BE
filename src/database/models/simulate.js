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
      journeyTitle: DataTypes.STRING,
      currentLocation: DataTypes.ARRAY(DataTypes.DECIMAL),
      speed: DataTypes.INTEGER,
      timeExpected: DataTypes.STRING,
      passengers: DataTypes.INTEGER,
      routeID: DataTypes.STRING,
      driverID: DataTypes.STRING,
      busID: DataTypes.STRING,
      status: DataTypes.ENUM('Moving', 'Paused', 'Ended'),
      trafficStatus: DataTypes.ENUM('High', 'Low', 'Medium', 'None'),
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Journey',
    }
  );
  return Journey;
};
