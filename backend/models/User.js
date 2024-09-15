const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    expertised_skills: {
        type: [String], // Array of strings to store multiple skills
        required: true,
    },
    tasksAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // References the Task model
    }],
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// // Compare entered password with hashed password in the database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;