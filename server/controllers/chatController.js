const History = require("../models/History");
const { askAI } = require("../services/aiService");

exports.chat = async (req, res) => {
    try {
        const { question, historyId } = req.body;

        const history = await History.findById(historyId);
        if (!history) {
            return res.status(404).json({ msg: "Context not found" });
        }

        const context = `Document 1: ${history.file1Name}. Document 2: ${history.file2Name}. Result: ${history.comparisonResult.summary}. User question: ${question}`;

        const response = await askAI(context);

        history.chat.push({ question, answer: response });
        await history.save();

        res.json({ answer: response });
    } catch (err) {
        res.status(500).json({ msg: "Chat error" });
    }
};