import express from 'express';
import textToSpeech from './server.js'; // Ensure this path is correct

const app = express();
const port = 3000;

// Use built-in express middleware to parse JSON
app.use(express.json());

app.post('/api', async (req, res) => {
    const { text } = req.body; // Remove storyId

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
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
