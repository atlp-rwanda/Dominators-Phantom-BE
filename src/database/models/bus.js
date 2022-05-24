'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate({Route}) {
      // define association here
      this.belongsTo(Route, {foreignKey: {name: 'routeId', allowNull: true}, onDelete: 'SET NULL', as: 'routes' }, )
    }
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
      // defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    busType: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, 
  {
    sequelize,
    paranoid: false,
    tableName: 'Buses',
    modelName: 'Bus',    
    // timestamps: true,

  });
  return Bus;
};

