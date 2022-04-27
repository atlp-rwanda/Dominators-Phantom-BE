<<<<<<< HEAD
import { Model } from 'sequelize';

=======
'use strict';
const {
  Model
} = require('sequelize');
>>>>>>> Added login feature, jwt on a succesful login and documentation
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD
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
        allowNull: false,
        validate: { min: 8 },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

=======
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
>>>>>>> Added login feature, jwt on a succesful login and documentation
  return User;
};
