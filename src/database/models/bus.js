'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.routes, {
      //   foreignKey: 'routeId',
      //   as: 'routes',
      // })

      this.hasMany(models.AssignDriver, {
        foreignKey: 'BusId',
        as: 'AssignDriver',
      });
    }
  }
  Bus.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      prateNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      routeId: DataTypes.STRING,
      busType: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: 'Bus',
    }
  );
  return Bus;
};
