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
      this.hasMany(models.AssignDriver, {
        foreignKey: 'BusId',
        as: 'AssignDriver',
      });
      this.belongsTo(models.routes, {
        foreignKey: {
          name: 'routeId',
          allowNull: false,
        },
        targetKey: 'routeId',
        as: 'routes',
        // through: {
        //   attributes: ['routeId'],
        // },
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
      routeId: DataTypes.UUID,
      busType: DataTypes.STRING,
      prateNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bus',
    }
  );
  return Bus;
};
