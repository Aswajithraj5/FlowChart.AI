import { GoogleGenerativeAI } from "@google/generative-ai";

// NOTE: In a real production app, this should be a backend call to hide the API key.
// We will look for VITE_GEMINI_API_KEY in environment variables.

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export interface AIResponse {
    flowchart: string;
    algorithm: string;
    pseudoCode: string;
}

export const generateContent = async (sourceCode: string): Promise<AIResponse> => {
    if (!apiKey) {
        throw new Error('Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    You are an expert software engineer and educator. 
    Analyze the following source code and generate three things:

    1. A Mermaid.js flowchart syntax (graph TD).
       - Start: "graph TD".
       - Start/End Nodes: REQUIRED: Use stadium syntax for Start/End: id(["Start"]), id(["End"]). Do NOT use rounded rect ( ).
       - Input/Output: Use parallelogram shape [/Input/], [/Output/].
       - Decisions: Use rhombus shape {Condition?}.
       - Processes: Use rectangular box [Process].
       - QUOTES: Put quotes around ALL text labels. Example: id1["Start"] --> id2["Input X"]
       - Edges: Label decision branches with |Yes| or |No|.

    2. A step-by-step algorithm in plain English.
       - Format: strictly numbered list (1., 2., 3.).
       - Content: Concise steps. No "Here is the algorithm" text.
       - Example:
         1. Start
         2. Input x
         3. If x > 0 then Output "Positive"
         4. Else Output "Negative"
         5. End

    3. A clear pseudo-code representation.
       - Style: Standard capital keywords (START, INPUT, IF, ELSE, PRINT, END).
       - Indentation: Use proper indentation for blocks.
       - Avoid markdown code blocks in the output string.

    Return the response strictly as a JSON object with keys: "flowchart", "algorithm", "pseudoCode".
    Do not include markdown formatting or backticks in the final JSON value.
    
    Source Code:
    ${sourceCode}
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Sanitize the response: remove markdown code blocks if present
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

        const json = JSON.parse(cleanedText) as AIResponse;
        return json;
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw error;
    }
};
