const router = require('express').Router();
const { where } = require('sequelize');
const { Performance } = require('../../models');
const withAuth = require('../../utils/auth');


//Create Performance Reviews
router.post('/', withAuth, async (req, res) => {
  try {
    const performance = await Performance.create({
      ...req.body,
      employee_id: req.session.employee_id
    });

    res.status(200).json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
});

// Updating performance review by id 
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the performance review by ID
    const performance = await Performance.findByPk(req.params.id);

    if (!performance) {
      return res.status(404).json({ message: 'Performance review not found' });
    }

    // Update the performance review with new data from the request body
    await performance.update(req.body, { 
      where: { id: req.params.id } 
    });

    // Fetch the updated instance
    const updatedPerformance = await Performance.findByPk(req.params.id);

    // Respond with the updated performance review
    res.status(200).json({ performance: updatedPerformance, message: 'Performance review successfully updated!' });

  } catch (err) {
    console.error('Error updating performance review:', err.message);
    res.status(400).json({ message: 'Failed to update performance review', error: err.message });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const performanceData = await Performance.destroy({
      where: {
        id: req.params.id,
        employee_id: req.session.employee_id
      }
    });

    if (!performanceData) {
      res.status(404).json({ message: 'No performance review found with this id!' });
      return;
    }

    res.status(200).json({ projectData, message: 'Performance review successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
