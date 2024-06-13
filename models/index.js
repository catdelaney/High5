const Employee = require('./Employee');
const Performance = require('./Performance');
const Department = require('./Department');

// Sequelize relationship between Employee and Performance 
Employee.hasMany(Performance, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE'
});

Performance.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

// Sequelize relationship between Employee and Department
Department.hasMany(Employee, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE'
});

Employee.belongsTo(Department, {
  foreignKey: 'department_id'
});

module.exports = { Employee, Performance, Department };
