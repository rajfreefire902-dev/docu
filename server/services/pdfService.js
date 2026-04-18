const fs = require("fs");
const pdf = require("@cedrugs/pdf-parse");

const readPDF = async (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found on server.");
        }

        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);
        
        const extractedText = pdfData.text ? pdfData.text.trim() : "";
        
        if (!extractedText || extractedText.length < 50) {
            throw new Error("The PDF appears to be empty or image-based (OCR required).");
        }

        return extractedText;
    } catch (error) {
        console.error("PDF extraction failed:", error.message);
        throw new Error(`Could not extract text from the PDF: ${error.message}`);
    }
};

module.exports = { readPDF };