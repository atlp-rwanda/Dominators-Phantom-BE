'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DriverNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Notification, {
        foreignKey: 'notificationId',
        targetKey: 'notificationId',
        as: 'Notification',
      });
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'User',
      });
    }
  }
  DriverNotification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      notificationId: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
      },
      viewStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'DriverNotification',
    }
  );
  return DriverNotification;
};
