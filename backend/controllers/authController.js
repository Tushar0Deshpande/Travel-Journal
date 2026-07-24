const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email: email.trim(),
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

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

        const accessToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET
        );

        const { password, ...userData } = user.toObject();
        res.status(200).json({ ...userData, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
};