'use strict';
import SequelizeSlugify from 'sequelize-slugify';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bus}) {
      // define association here
      this.hasMany(Bus, 
        { 
          foreignKey: 'routeId', 
          as: 'Buses', 
          onDelete: "cascade", 
          onUpdate: "cascade" ,
          hooks: true 
        });
      }
    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  }
  routes.init({
    routeId: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
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
      type: DataTypes.STRING
    },
    

  }, {
    sequelize,
    tableName: 'routes',
    modelName: 'routes',
  });
  routes.removeAttribute('id');

  SequelizeSlugify.slugifyModel(routes, {
    source: ['origin'],
    suffixSource: ['destination'],
    column: 'routeSlug'
  });

  return routes;
};