const fs = require("fs");
const pdf = require("@cedrugs/pdf-parse");

const readPDF = async (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("File path does not exist");
        }

        const dataBuffer = fs.readFileSync(filePath);
        const parser = typeof pdf === 'function' ? pdf : pdf.default;
        const pdfData = await parser(dataBuffer);
        const text = pdfData.text ? pdfData.text.trim() : "";
        
        if (text.length < 10) {
            throw new Error("Insufficient text content extracted");
        }

        return text;
    } catch (error) {
        throw new Error(`PDF Processing Error: ${error.message}`);
    }
};

module.exports = { readPDF };