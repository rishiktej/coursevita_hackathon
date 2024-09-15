const express = require('express');
const router = express.Router();
const Task = require('../models/ATask'); // Path to your Task model
const User = require('../models/User');
const nodemailer = require('nodemailer');

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

// Example endpoint to fetch task details by ID
router.get('/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
        user: 'rishiktejgangadi@gmail.com', // Use environment variables
        pass: 'wwic nrcy qeie cugh', // Use environment variables
    },
});

router.use(express.json());

router.get('/alltasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ msg: 'No tasks found' });
        }
        res.json(tasks); // Send the tasks as JSON response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
router.post('/send-notifications', async (req, res) => {
    try {
        // Fetch all tasks
        const tasks = await Task.find(); // Fetch all tasks from the database

        // Filter overdue tasks
        const now = new Date();
        const overdueTasks = tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate < now && task.status !== 'Completed';
        });

        // Extract user IDs from overdue tasks
        const assignedUserIds = [...new Set(overdueTasks.map(task => task.assignedTo))]; // Remove duplicates

        // Fetch user details based on user IDs
        const users = await User.find({ _id: { $in: assignedUserIds } });

        // Create email content
        const emailPromises = users.map((user) => {
            const userTasks = overdueTasks.filter(task => task.assignedTo.equals(user._id)); // Filter tasks assigned to this user
            const mailOptions = {
                from: 'rishiktejgangadi@gmail',
                to: user.email,
                subject: 'Overdue Task Notification',
                text: `Dear ${user.name},\n\nYou have overdue tasks:\n\n` +
                    userTasks.map(task => `Title: ${task.title}\nDue Date: ${new Date(task.dueDate).toLocaleDateString()}`).join('\n\n') +
                    `\n\nPlease address them as soon as possible.\n\nBest Regards,\nYour Team`,
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);
        res.status(200).send('Notifications sent successfully.');
    } catch (error) {
        res.status(500).send('Failed to send notifications: ' + error.message);
    }
});



module.exports = router;
