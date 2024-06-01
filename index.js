const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require("dotenv");
dotenv.config();
const readline=require("readline");

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_key);

const userInterface=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
userInterface.prompt();

userInterface.on("line",async input=>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    // const prompt = "Weather condition in India"
  
    const result = await model.generateContent(input);
    const response = await result.response;
    const text = response.text();
    console.log(text);

})
// async function run() {
//   // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//   const prompt = "Weather condition in India"

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

