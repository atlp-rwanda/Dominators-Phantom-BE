'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignDriver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
          allowNull: true,
        },
        as: 'Users',
      });
    }
  }
  AssignDriver.init(
    {
      UserId: DataTypes.INTEGER,
      BusId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'AssignDriver',
    }
  );
  return AssignDriver;
};
