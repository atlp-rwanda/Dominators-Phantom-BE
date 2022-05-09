'use strict';
import SequelizeSlugify from 'sequelize-slugify';
const {
  Model
} = require('sequelize');
// // const { appRoutes } = require('../../routes');
// // const { default: router } = require('../../routes/api/buses');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({routes}) {
      // define association here
      this.belongsTo(routes, { 
        foreignKey: {name: 'routeId', allowNull: true }, 
        as: 'Route',
        onUpdate: "cascade" 
      });
    }
    // toJSON() {
    //   return { ...this.get(), id: undefined, routeId: undefined }
    // }
  }
  Bus.init({ 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    prateNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    },
    busType: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, 
  {
    sequelize,
    tableName: 'Buses',
    modelName: 'Bus',    
    timestamps: true,

  });
  return Bus;
};

