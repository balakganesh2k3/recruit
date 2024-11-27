import dotenv from 'dotenv';

dotenv.config();
import { GoogleGenerativeAI } from 'generative-ai';

export const gemini = async(req, res) =>{
    const { transcription, resume, jobDescription } = req.body;
    console.log('Transcription:', transcription);

    try {
        // Set up the prompt for the API call to Gemini
        const prompt = `Based on the following transcription, resume, and job description, generate a follow-up question to assess the candidate's fit:
        Transcription: "${transcription}"
        Resume: "${resume}"
        Job Description: "${jobDescription}"
        not more than 50 words.`;
        
        console.log('Prompt:', prompt);

        // Log the API key to ensure it's being accessed correctly
        const apiKey = process.env.GEMINI_API_KEY;

        // Initialize the model with the API key
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Pass the prompt as part of an object to generate content
        const response = await model.generateContent(prompt);

        // Log and send the generated content
        console.log(response);
        res.status(200).json({ question: response.response.text() }); // Send the response back
    } catch (error) {
        console.error('Error querying Gemini:', error);
        res.status(500).json({ message: 'Error communicating with Gemini API' });
    }
}


