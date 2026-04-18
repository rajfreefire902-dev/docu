const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        res.json({
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};