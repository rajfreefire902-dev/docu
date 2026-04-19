const { readPDF } = require("../services/pdfService");
const { askAI } = require("../services/aiService");
const History = require("../models/History");

exports.compare = async (req, res) => {
    try {
        if (!req.files || !req.files.file1 || !req.files.file2) {
            return res.status(400).json({ msg: "Both documents are required" });
        }

        const text1 = await readPDF(req.files.file1[0].path);
        const text2 = await readPDF(req.files.file2[0].path);

        const prompt = `
            Analyze these documents. 
            Doc 1: ${text1}
            Doc 2: ${text2}
            Return JSON: { "summary": "", "similarities": "", "differences": "", "missingTopics": "" }
        `;

        const aiResponse = await askAI(prompt);
        const finalResult = JSON.parse(aiResponse);

        const newHistory = new History({
            userId: req.user.id,
            file1Name: req.files.file1[0].originalname,
            file2Name: req.files.file2[0].originalname,
            comparisonResult: finalResult
        });
        
        const savedHistory = await newHistory.save();

        res.status(200).json({
            success: true,
            historyId: savedHistory._id
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};