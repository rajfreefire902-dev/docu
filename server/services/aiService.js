const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.askAI = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return response.choices[0].message.content;
    } catch (err) {
        throw new Error(`AI Gateway Error: ${err.message}`);
    }
};