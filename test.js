const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt = "Explain how AI works";

async function main() {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

main();