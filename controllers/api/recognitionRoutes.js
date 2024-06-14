const router = require('express').Router();
const { Recognition, User } = require('../../models');

router.get('/recognitions', async (req, res) => {
  try {
    const recognitions = await Recognition.findAll();
    res.json(recognitions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recognitions/:id', async (req, res) => {
  try {
    const recognition = await Recognition.findByPk(req.params.id);
    if (!recognition) {
      return res
        .status(404)
        .json({ message: 'No recognition found with this id!' });
    }
    res.json(recognition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/recognitions', async (req, res) => {
  try {
    const recognition = await Recognition.create(req.body);
    res.status(201).json(recognition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/recognitions/:id', async (req, res) => {
  try {
    const recognition = await Recognition.findByPk(req.params.id);
    if (!recognition) {
      return res
        .status(404)
        .json({ message: 'No recognition found with this id!' });
    }
    await recognition.update(req.body);
    res.json(recognition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/recognitions/:id', async (req, res) => {
  try {
    const recognition = await Recognition.findByPk(req.params.id);
    if (!recognition) {
      return res
        .status(404)
        .json({ message: 'No recognition found with this id!' });
    }
    await recognition.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
