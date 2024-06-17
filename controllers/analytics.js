const express = require('express');
const router = express.Router();
const { Employee, Performance, Department } = require('../models');

// Route to render the analytics page
router.get('/', async (req, res) => {
    try {
        // Query performance data with department included
        const performances = await Performance.findAll({
            include: [{ model: Employee, include: Department }],
        });

        // Define the departments
        const departments = [
            { name: "Marketing" },
            { name: "Sales" },
            { name: "Finance" }
        ];

        // Group performances by department
        const performancesByDepartment = departments.reduce((acc, department) => {
            const departmentName = department.name;
            const performancesForDepartment = performances.filter(performance => performance.Employee.Department.name === departmentName);

            acc[departmentName] = {
                labels: performancesForDepartment.map(performance => `${performance.Employee.first_name} ${performance.Employee.last_name}`),
                revenueData: performancesForDepartment.map(performance => performance.revenue_generated),
                workQualityData: performancesForDepartment.map(performance => performance.work_quality),
                businessData: performancesForDepartment.map(performance => performance.new_existing_business),
            };
            return acc;
        }, {});

        // Render the analytics view with the grouped data
        res.render('analytics', { performancesByDepartment });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;