import dotenv from 'dotenv';

dotenv.config();
import { GoogleGenerativeAI } from 'generative-ai';

export const gemini = async(req, res) =>{
    const { transcription, resume, jobDescription } = req.body;
    console.log('Transcription:', transcription);

    try {
        // Set up the prompt for the API call to Gemini
        //Based on the following candidates response, resume, and job description, generate a follow-up question to assess the candidate's fit. ACT like you are the interviewer and ask a relavant question.Remember the candidate's response to the previous question and make it CONVERSATIONAL .Please dont keep asking about the same topic:
        //YOU ARE A HUMAN WHO IS INTERVIEWING A CANDIDATE FOR A JOB. YOUR JOB IS TO REPLY TO THE CANDIDATE AS CLOSE TO A HUMAN AS POSSIBLE AND IT SHOULD BE INTERACTIVE. IT SHOULD BE A DIRECT RESPONSE TO THE REPLY OF THE CANDIDATE. BASED ON HIS RESPONSE AND HAVE HIS RESUME AND JOB DESCRIPTION IN MIND.
        //ACT LIKE A INTERVIEWER WHO IS CONVERSATING WITH A CANDIDATE AND THE ONLY PRIORITY IS TO ANSWER THE REPLY OF THE CANDIDATE:
        const prompt = ` Based on the following candidates response, resume, and job description, generate a follow-up question to assess the candidate's fit. ACT like you are the interviewer and ask a relavant question.Remember the candidate's response to the previous question and make it CONVERSATIONAL AND make each question unique .Please dont keep asking about the same topic:
        reply: "${transcription}"
        Resume: "${resume}"
        Job Description: "${jobDescription}"
        not more than 50 words.`;

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

export const feedback = async(req, res) =>{
    const { allquestions, allresponses, jobDescription } = req.body;
    const qanda = allquestions.map((question, index) => `${question} ${allresponses[index]}`).join(' ');
    console.log('Q&A:', qanda);

    try {
        // Set up the prompt for the API call to Gemini
        //Based on the following candidates response, resume, and job description, generate a follow-up question to assess the candidate's fit. ACT like you are the interviewer and ask a relavant question.Remember the candidate's response to the previous question and make it CONVERSATIONAL .Please dont keep asking about the same topic:
        //YOU ARE A HUMAN WHO IS INTERVIEWING A CANDIDATE FOR A JOB. YOUR JOB IS TO REPLY TO THE CANDIDATE AS CLOSE TO A HUMAN AS POSSIBLE AND IT SHOULD BE INTERACTIVE. IT SHOULD BE A DIRECT RESPONSE TO THE REPLY OF THE CANDIDATE. BASED ON HIS RESPONSE AND HAVE HIS RESUME AND JOB DESCRIPTION IN MIND.
        //ACT LIKE A INTERVIEWER WHO IS CONVERSATING WITH A CANDIDATE AND THE ONLY PRIORITY IS TO ANSWER THE REPLY OF THE CANDIDATE:
        const prompt = ` Based on the candidates responses to the questions give the candidate feedback to imporve. use various types of skill catagories to do so.
        Q&A: "${qanda}"
        Job Description: "${jobDescription}"
        not more than 50 words.`;

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

