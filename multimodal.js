const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_key);

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: { data: Buffer.from(fs.readFileSync(filePath)).toString("base64"), mimeType },
  };
}

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "describe the picture";

  const imageParts = [
    await fileToGenerativePart("image.jpg", "image/jpeg"), // Corrected MIME type
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

