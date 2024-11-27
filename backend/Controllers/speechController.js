let transcripts = []; // To temporarily store transcripts

// Store transcripts in localStorage in real-time
const saveToLocalStorage = () => {
    localStorage.setItem('transcripts', JSON.stringify(transcripts));
};

// Handle incoming transcription (called via socket or API)
export const handleTranscription = (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send({ error: 'No transcription provided' });
    }

    transcripts.push(text); // Add to in-memory storage
    saveToLocalStorage();   // Save to localStorage

    res.status(200).send({ message: 'Transcript saved!' });
};

// Retrieve stored transcripts
export const getTranscripts = (req, res) => {
    const storedTranscripts = localStorage.getItem('transcripts');
    res.status(200).send({ transcripts: storedTranscripts ? JSON.parse(storedTranscripts) : [] });
};
