'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: { name: 'userId', allowNull: true },
        as: 'Users',
      });
      // }
    }
  }
  Profile.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: DataTypes.UUID,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: {
        type: DataTypes.INTEGER,
        defaultValue: 250,
      },
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      profilePic: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      province: { type: DataTypes.STRING, defaultValue: '' },
      district: { type: DataTypes.STRING, defaultValue: '' },
      sector: { type: DataTypes.STRING, defaultValue: '' },
      cell: { type: DataTypes.STRING, defaultValue: '' },
      village: { type: DataTypes.STRING, defaultValue: '' },
      bio: { type: DataTypes.STRING, defaultValue: 'No Bio Yet' },
      category: { type: DataTypes.STRING, defaultValue: 'No Category' },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM('Male', 'Female', 'Prefer not to say'),
        defaultValue: 'Prefer not to say',
      },
      nationalId: { type: DataTypes.STRING, defaultValue: '' },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};
