const { readPDF } = require("../services/pdfService");
const { askAI } = require("../services/aiService");
const History = require("../models/History");

exports.compare = async (req, res) => {
    try {
        if (!req.files || !req.files.file1 || !req.files.file2) {
            return res.status(400).json({ msg: "Please upload both files" });
        }

        const text1 = await readPDF(req.files.file1[0].path);
        const text2 = await readPDF(req.files.file2[0].path);

        const prompt = `
            You are an expert document analyzer. Compare these documents:
            Doc 1: ${text1}
            Doc 2: ${text2}

            Output ONLY valid JSON:
            {
                "summary": "...",
                "similarities": "...",
                "differences": "...",
                "missingTopics": "..."
            }
        `;

        const aiResponse = await askAI(prompt);
        
        let finalJson;
        try {
            const start = aiResponse.indexOf('{');
            const end = aiResponse.lastIndexOf('}') + 1;
            finalJson = JSON.parse(aiResponse.substring(start, end));
        } catch (e) {
            finalJson = { 
                summary: aiResponse, 
                similarities: "Check summary", 
                differences: "Check summary", 
                missingTopics: "N/A" 
            };
        }

        const history = new History({
            userId: req.user.id,
            file1Name: req.files.file1[0].originalname,
            file2Name: req.files.file2[0].originalname,
            comparisonResult: finalJson
        });
        
        const saved = await history.save();

        res.status(200).json({
            success: true,
            historyId: saved._id.toString()
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};