const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const router = express.Router();
const app = express();
dotenv.config();
// Register a new user
app.use(express.json());

const session = require('express-session');
const MongoStore = require('connect-mongo');


app.use(
    session({
        secret: 'SecretKey1234',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://rishiktejreddy:rishiktej%406@users.y3uz0.mongodb.net/?retryWrites=true&w=majority&appName=Users', // Use your MongoDB connection string
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1-day session duration
    })
);

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

        // Store user ID in session
        req.session.userId = user.id;

        res.status(201).json({ msg: 'User logged in successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;