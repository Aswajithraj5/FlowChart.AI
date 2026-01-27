import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

const apiKey = "AIzaSyAWkW_xa29nzE4ro25rKFuPXErV4vOyDL4";

async function listModels() {
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        fs.writeFileSync('models_output.json', JSON.stringify(data, null, 2), 'utf-8');
        console.log('Done');
    } catch (error) {
        console.error(error);
    }
}

listModels();
