const Employee = require('./Employee');
const Performance = require('./Performance');

Employee.hasMany(Performance, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE'
});

Performance.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

module.exports = { Employee, Performance };
