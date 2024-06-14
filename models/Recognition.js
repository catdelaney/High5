const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recognition extends Model {}

Recognition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    recognition_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    recognition_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            'Employee of the Month',
            'Milestone Achievement',
            'Team Player',
            'Innovation Award',
            'Leadership Excellence',
            'Customer Service',
          ],
        ],
      },
    },
    recognition_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'recognition',
  }
);

module.exports = Recognition;
