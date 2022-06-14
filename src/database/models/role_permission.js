'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.permissions, {
      //   foreignKey: 'permission_id',
      //   as: 'permissions',
      // }),
      //   this.hasMany(models.roles, {
      //     foreignKey: 'role_id',
      //     as: 'roles',
      //   });
    }
  }
  Role_permission.init(
    {
      role_id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      permission_id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
    },
    {
      sequelize,
      modelName: 'role_permissions',
    }
  );
  return Role_permission;
};
