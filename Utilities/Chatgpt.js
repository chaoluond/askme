import React from 'react';
const openAiApiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
const engineId = 'gpt-4'; // Specify the correct engine ID for your use case

const sendTextToChatGPT = async (inputText) => {
    try {
        const response = await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openAiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: inputText,
                max_tokens: 1024,
                temperature: 0.9,
            }),
        });

        const data = await response.json();
        console.log(data.choices[0].text); // Handle the response as needed
    } catch (error) {
        console.error('There was an error:', error);
    }
}

export { sendTextToChatGPT };


