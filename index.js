import express from 'express';
import textToSpeech from './server.js';

const app = express();
const port = process.env.PORT || 3000;

// Use the built-in express middleware for parsing JSON
app.use(express.json());

app.post('/api', async (req, res) => {
    const { text, storyId } = req.body;
    try {
        const audioBytes = await textToSpeech(text, storyId);
        if (audioBytes) {
            res.set('Content-Type', 'audio/mpeg');
            res.send(Buffer.from(audioBytes));  // Convert the Uint8Array to Buffer
        } else {
            res.status(500).send('Failed to generate speech');
        }
    } catch (error) {
        console.error('Error in /api route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
