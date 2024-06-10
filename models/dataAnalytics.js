const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the DataAnalytics model
class DataAnalytics extends Model {}

// Initialize the model with attributes and options
DataAnalytics.init(
  {
    // Define the 'id' attribute as an auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'attribute1' attribute as a non-nullable string
    attribute1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'attribute2' attribute as a non-nullable integer
    attribute2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
  },
  {
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Disable pluralization of table name
    underscored: true, // Use snake_case for automatically added attributes
    modelName: 'dataAnalytics', // Model name
  }
);

module.exports = DataAnalytics;