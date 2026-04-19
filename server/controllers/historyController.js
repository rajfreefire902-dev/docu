const History = require("../models/History");

exports.getHistory = async (req, res) => {
    try {
        const data = await History.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching history" });
    }
};