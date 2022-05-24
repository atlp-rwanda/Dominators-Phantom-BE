import { Model } from 'sequelize';
import { v4 as uuid } from 'uuid';

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
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuid(),
        primaryKey: true,
        allowNull: false,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        lowercase: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'operator', 'driver'),
        allowNull: false,
      },
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
  // User.beforeCreate((user, _) => (user.id = uuid()));
  return User;
};