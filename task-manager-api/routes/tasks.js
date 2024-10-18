// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @route   GET /tasks
// @desc    Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
