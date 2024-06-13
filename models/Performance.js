const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Performance extends Model {}

Performance.init(
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
      }
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    revenue_generated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    work_quality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    new_existing_business: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    // overall_score: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   defaultValue: 0
    // }
  },
  {
    hooks: {
      beforeSave: (performance) => {
        performance.overall_score = (performance.revenue_generated + performance.work_quality + performance.new_existing_business) / 3;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'performance',
  }
);

module.exports = Performance;
