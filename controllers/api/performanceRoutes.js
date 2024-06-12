const router = require('express').Router();
const { Employee, Performance } = require('../../models');
const withAuth = require('../../utils/auth');


//Create Performance Reviews
router.post('/', withAuth, async (req, res) => {
  const { employee_id, review_date, revenue_generated, work_quality, new_existing_business } = req.body;
  try {
    const performance = await Performance.create({
      employee_id,
      review_date,
      revenue_generated,
      work_quality,
      new_existing_business,
      //is the next line needed?
      //user_id: req.session.user_id,
    });

    res.status(200).json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
});

//Get Performance Reviews
router.get('/', withAuth, async (req, res) => {
  try {
    const performances = await Performance.findAll({
      include: [{
        model: Employee,
        attributes: ['fName', 'lName', 'department']
      }]
    });
    res.status(200).json(performances);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
  });





router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
