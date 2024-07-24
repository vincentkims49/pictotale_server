import express from 'express';
import textToSpeech from './server.js';

const app = express();

app.use(express.json());

app.post('/api', async (req, res) => {
    console.log('Received request to /api');
    console.log('VOICE_ID:', process.env.VOICE_ID);
    console.log('ELEVEN_LABS_KEY (first 4 chars):', process.env.ELEVEN_LABS_KEY?.substring(0, 4));

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

export default app;