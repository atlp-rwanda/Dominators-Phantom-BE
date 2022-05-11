'use strict';
import SequelizeSlugify from 'sequelize-slugify';
import { v4 as uuid } from 'uuid';

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
    }
  }
  routes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuid(),
        isUUID: 4,
        primaryKey: true,
        allowNull: false,
      },
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      code: DataTypes.STRING,
      distance: DataTypes.STRING,
      status: DataTypes.ENUM('pending', 'active', 'disabled'),
      routeSlug: DataTypes.STRING,
      coordinates: DataTypes.ARRAY(DataTypes.DECIMAL),
    },

    {
      sequelize,
      modelName: 'routes',
    }
  );

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
