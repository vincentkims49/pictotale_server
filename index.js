import express from 'express';
import { json } from 'body-parser';
import textToSpeech from './sever';

const app = express();
const port = 3000;

app.use(json());

app.post('/text-to-speech', async (req, res) => {
    const { text, storyId } = req.body;
    try {
        const audioBytes = await textToSpeech(text, storyId);
        if (audioBytes) {
            res.set('Content-Type', 'audio/mpeg');
            res.send(audioBytes);
        } else {
            res.status(500).send('Failed to generate speech');
        }
    } catch (error) {
        console.error('Error in /text-to-speech route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;