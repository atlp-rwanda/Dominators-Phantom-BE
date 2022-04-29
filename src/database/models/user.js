
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Profile, {
        foreignKey: 'userId',
        as: 'Profiles'
      })
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        lowercase: true,
      },
      role: { type: DataTypes.STRING, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { min: 8 },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
