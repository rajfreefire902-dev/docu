const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.askAI = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: text }]
        });
        return response.choices[0].message.content;
    } catch (err) {
        return "AI Error";
    }
};