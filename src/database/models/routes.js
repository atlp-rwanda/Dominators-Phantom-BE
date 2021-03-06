'use strict';
import SequelizeSlugify from 'sequelize-slugify';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // routes.hasMany(models.Bus, {
      //   foreignKey: 'routeId',
      //   as: 'routes',
      // });
    }
  }
  routes.init(
    {
      routeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      code: DataTypes.STRING,
      distance: DataTypes.STRING,
      status: DataTypes.ENUM('pending', 'active', 'disabled'),
      routeSlug: DataTypes.STRING,
      fromCoordinates: DataTypes.ARRAY(DataTypes.DECIMAL),
      toCoordinates: DataTypes.ARRAY(DataTypes.DECIMAL),
    },
    {
      sequelize,
      modelName: 'routes',
    }
  );
  routes.removeAttribute('id');

  SequelizeSlugify.slugifyModel(routes, {
    source: ['origin'],
    suffixSource: ['code'],
    incrementalSeparator: '-',
    overwrite: true,
    bulkUpdate: true,
    suffixSource: ['destination'],
    column: 'routeSlug',
  });
  return routes;
};
