const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !emailRegex.test(email.trim())) {
            return res.status(400).json("Please enter a valid email address!");
        }

        if (!password || password.length < 8) {
            return res.status(400).json("Password must be at least 8 characters long!");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email: email.trim(),
            password: hashedPassword,
        });

        // Save user and respond
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("Wrong credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong credentials!");
        }

        // Create JWT Token
        const accessToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET
        );

        const { password, ...others } = user._doc; // separate password from other user data
        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }
};