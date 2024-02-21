import OpenAI from "openai";
import { genTaskPrompt } from './Constants';
const openAiApiKey = 'your-openai-key'; // Replace with your actual API key
const engineId = 'gpt-4-0125-preview'; // Specify the correct engine ID for your use case

const openai = new OpenAI({ apiKey: openAiApiKey });

const sendTextToChatGPT = async (inputText) => {
    try {
        const prompt = genTaskPrompt(inputText);
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: engineId,
        });
        console.log(completion.choices[0]['message']['content']);
        return completion.choices[0]['message']['content'];
    } catch (error) {
        console.error('There was an error:', error);
    }
}

export { sendTextToChatGPT };


