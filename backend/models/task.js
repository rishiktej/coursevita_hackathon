const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Link to the User model
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
        default: 'Pending',
    },
    dueDate: {
        type: Date,
        required: true,
    },
    progress: {
        type: Number, // Task progress (0-100%)
        default: 0,
    },
    referenceFiles: [{
        type: String, // URLs or paths to files/folders
    }],
    inputLink: {
        type: String, // Input link for task output
    },
    // inputFiles: [{
    //     type: String, // URLs or paths to input files
    // }],
}, { timestamps: true });

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;