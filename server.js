import express from 'express';
import { json } from 'body-parser';
import textToSpeech from '.';

const app = express();
const port = 3000;

app.use(json());

app.post('/text-to-speech', async (req, res) => {
    const { text, storyId } = req.body;
    const audioBytes = await textToSpeech(text, storyId);
    if (audioBytes) {
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBytes);
    } else {
        res.status(500).send('Failed to generate speech');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
