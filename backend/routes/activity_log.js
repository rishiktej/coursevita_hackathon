// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as necessary
const Task = require('../models/ATask'); // Adjust path as necessary

// GET /admin/dashboard
router.get('/dashboard', async (req, res) => {
    try {
        // Fetch all users and their associated tasks
        const users = await User.find().exec(); // Get all users
        const tasks = await Task.find().populate('assignedTo').exec(); // Get all tasks and populate assignedTo

        // Map tasks by user
        const userTasks = users.map(user => {
            return {
                username: user.username,
                email: user.email,
                tasksAssigned: tasks.filter(task => task.assignedTo && task.assignedTo._id.equals(user._id))
            };
        });

        // Send the combined data
        res.status(200).json({ userTasks });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
