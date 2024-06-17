const router = require('express').Router();
const { Performance, Employee, Department } = require('../models');
const withAuth = require('../utils/auth');







//Get Performance Reviews
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const performances = await Performance.findAll({
//       include: [{
//         model: Employee,
//         attributes: ['fName', 'lName', 'department']
//       }]
//     });
//     res.status(200).json(performances);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).json(err);
//   }
//   });

//Get Performance Review by Employee ID#
// router.get('/:id', withAuth, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const performances = await Performance.findByPk(id, {
//       include: [{
//         model: Employee,
//         attributes: ['fName', 'lName', 'department']
//       }]
//     });
//     if (performance) {
//       res.status(200).json(performances);
//     } else {
//       res.status(404).json('Performance review not found');
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).json(err);
//   }
//   });







router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
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
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
