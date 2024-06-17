const express = require('express');
const router = express.Router();
const { Employee, Performance, Department } = require('../models');

// Route to render the analytics page
router.get('/', async (req, res) => {
    try {
        // Query performance data with department included
        const performancesData = await Performance.findAll({
            include: [{ model: Employee, include: Department }],
        });

        // Serialize data so the template can read it and render it
        const performances = performancesData.map((performance) => performance.get({ plain: true }));

        console.dir(performances, {depth:5});

        // Defines the departments
        const departments = [
            { name: "Marketing" },
            { name: "Sales" },
            { name: "Finance" }
        ];

        // Group performances by department
        const performancesByDepartment = departments.reduce((acc, department) => {
            const departmentName = department.name;
            const performancesForDepartment = performances.filter(performance => performance.employee.department.name === departmentName);

            acc[departmentName] = {
                labels: performancesForDepartment.map(performance => `${performance.employee.first_name} ${performance.employee.last_name}`),
                revenueData: performancesForDepartment.map(performance => performance.revenue_generated),
                workQualityData: performancesForDepartment.map(performance => performance.work_quality),
                businessData: performancesForDepartment.map(performance => performance.new_existing_business),
            };
            return acc;
        }, {});

        console.dir(performancesByDepartment, {depth:5});

        // Render the analytics view with the grouped data
        res.render('analytics', { performancesByDepartment });
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;