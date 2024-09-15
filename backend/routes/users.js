const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();
// Register a new user
router.post('/register', async (req, res) => {
    const { name, username, email, password, expertised_skills } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            username,
            email,
            password,
            expertised_skills,
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully', user });
        const payload = {
            user: {
                id: user.id,
            },
        };

        // jwt.sign(
        //     payload,
        //     process.env.SECRETKEY, // Replace with your secret key
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token });
        //     }
        // );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                expertised_skills: user.expertised_skills,
                email: user.email,
                username: user.username,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETKEY,
            (err, token) => {
                if (err) throw err;
                res.json({ token, expertised_skills: user.expertised_skills, email: user.email, username: user.username });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;