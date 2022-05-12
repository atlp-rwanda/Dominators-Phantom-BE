'use strict';
import SequelizeSlugify from 'sequelize-slugify';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate({Bus}) {
    // define association here
      this.hasMany(Bus, {foreignKey: 'routeId', as: 'Buses', onDelete: 'SET NULL' })
    }
  }
  Route.init({
    routeId: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
      // unique: true
    },
    origin: {
      type: DataTypes.STRING,
    },
    destination:{
      type:  DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    distance: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "disabled")
  },
    routeSlug: {
      type: DataTypes.STRING,
      unique: true
    },
    

  }, {
    sequelize,
    paranoid: false,
    tableName: 'routes',
    modelName: 'Route',
  });
  Route.removeAttribute('id');

  SequelizeSlugify.slugifyModel(Route, {
    source: ['origin'],
    suffixSource: ['code'],
    incrementalSeparator: '-',
    overwrite: true,
    bulkUpdate: true,
    suffixSource: ['destination'],
    column: 'routeSlug',
  });

  return Route;
};