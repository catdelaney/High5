const sequelize = require('../config/connection');
const { Employee, Performance, Department } = require('../models');

const employeeData = require('./employeeData.json');
const performanceData = require('./performanceData.json');
const departmentData = require('./departmentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(departmentData);

  const employees = await Employee.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });

  for (const performance of performanceData) {
    await Performance.create({
      ...performance,
      employee_id: employees[Math.floor(Math.random() * employees.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
