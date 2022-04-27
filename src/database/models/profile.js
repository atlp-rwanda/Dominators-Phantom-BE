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
      userId: DataTypes.INTEGER,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phone: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      profilePic: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      sector: DataTypes.STRING,
      cell: DataTypes.STRING,
      village: DataTypes.STRING,
      bio: DataTypes.STRING,
      category: DataTypes.STRING,
      gender: {
        allowNull: false,
        type: DataTypes.ENUM('Male', 'Female'),
      },
      nationalId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};
