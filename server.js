import axios from 'axios';

const Constants = {
    voiceid: "rCuVrCHOUMY3OwyJBJym",
    elevenLabsKey: "sk_7d43cc72cea456c347e57929812026ff8c79b29ddbc4d800"
};

async function textToSpeech(text) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${Constants.voiceid}`;
    const headers = {
        'xi-api-key': Constants.elevenLabsKey,
        'Content-Type': 'application/json',
    };
    const body = {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
    };

    try {
        const response = await axios.post(url, body, { headers: headers, responseType: 'arraybuffer' });
        if (response.status === 200) {
            const bytes = response.data;
            console.log(`Received audio bytes length: ${bytes.byteLength}`);
            return bytes;
        } else {
            console.error('Failed to generate speech:', response.data.toString());
            return null;
        }
    } catch (error) {
        console.error('Error in text-to-speech:', error.response ? error.response.data.toString() : error.message);
        throw error; // Propagate the error to be handled in the main route
    }
}

export default textToSpeech;