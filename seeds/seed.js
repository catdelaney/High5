const sequelize = require('../config/connection');
const { Employee, Performance } = require('../models');

const employeeData = require('./employeeData.json');
const performanceData = require('./performanceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

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
