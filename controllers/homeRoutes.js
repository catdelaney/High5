const router = require('express').Router();
const {
  Project,
  User,
  Employee,
  Department,
  Performance,
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template

    const employees = await Employee.findAll();
    const performances = await Performance.findAll();
    const employeesData = employees.map((employee) => employee.toJSON());
    const performanceData = performances.map((performance) =>
      performance.toJSON()
    );

    // Function to find the top performer in a category
    function findTopPerformer(performances, category) {
      return performances.reduce((topPerformer, currentPerformance) => {
        return currentPerformance[category] > (topPerformer[category] || 0)
          ? currentPerformance
          : topPerformer;
      }, {});
    }

    // Mapping top performer to employee details
    function mapToEmployeeDetails(topPerformer, employees) {
      return employees.find(
        (employee) => employee.id === topPerformer.employee_id
      );
    }

    // Find top performers in each category
    const topRevenuePerformer = findTopPerformer(
      performanceData,
      'revenue_generated'
    );
    const topWorkQualityPerformer = findTopPerformer(
      performanceData,
      'work_quality'
    );
    const topNewExistingBusinessPerformer = findTopPerformer(
      performanceData,
      'new_existing_business'
    );

    // Get employee details for each top performer
    const topRevenueEmployee = mapToEmployeeDetails(
      topRevenuePerformer,
      employeesData
    );
    const topWorkQualityEmployee = mapToEmployeeDetails(
      topWorkQualityPerformer,
      employeesData
    );
    const topNewExistingBusinessEmployee = mapToEmployeeDetails(
      topNewExistingBusinessPerformer,
      employeesData
    );

    res.render('homepage', {
      // projects,
      topRevenueEmployee,
      topWorkQualityEmployee,
      topNewExistingBusinessEmployee,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/performance-reviews', withAuth, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const departments = await Department.findAll();
    const performances = await Performance.findAll();
    const employeesData = employees.map((employee) => employee.toJSON());
    const departmentsData = departments.map((department) =>
      department.toJSON()
    );
    const performanceData = performances.map((performance) =>
      performance.toJSON()
    );
    res.render('performancereviews', {
      employees: employeesData,
      departments: departmentsData,
      performances: performanceData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const employeeData = await Employee.findOne({
      where: { id: req.session.employee_id }, // Adjust condition if necessary
      attributes: { exclude: ['password'] },
    });

    const employee = employeeData.get({ plain: true });

    res.render('profile', {
      ...employee,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.redirect('/login');
  });
});

module.exports = router;
