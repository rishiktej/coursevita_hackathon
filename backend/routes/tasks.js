const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Path to your Task model

// POST /tasks
router.post('/tasks', async (req, res) => {
    const {
        title,
        description,
        assignedTo,
        status,
        dueDate,
        progress,
        referenceFiles,
        inputLink
    } = req.body;

    try {
        // Create a new Task instance
        const task = new Task({
            title,
            description,
            assignedTo,
            status,
            dueDate,
            progress,
            referenceFiles,
            inputLink
        });

        // Save the task to the database
        await task.save();

        // Send a success response
        res.status(201).json({ msg: 'Task created successfully', task });
    } catch (error) {
        // Send an error response
        res.status(500).json({ msg: 'Server error', error });
    }
});

module.exports = router;
