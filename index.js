import express from 'express';
import textToSpeech from './server.js';

const app = express();
const port = 3000; // Use environment variable for port

app.use(express.json());

app.post('/api', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Text is required');
    }

    try {
        const audioBytes = await textToSpeech(text);
        if (audioBytes) {
            res.set('Content-Type', 'audio/mpeg');
            res.send(audioBytes);
        } else {
            res.status(500).send('Failed to generate speech');
        }
    } catch (error) {
        console.error('Error in /api route:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;