import axios from 'axios';

const Constants = {
    voiceid: 'rCuVrCHOUMY3OwyJBJym', // Replace with your actual voice ID
    elevenLabsKey: 'sk_7d43cc72cea456c347e57929812026ff8c79b29ddbc4d800' // Replace with your actual API key
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
            console.log(`Received audio bytes length: ${bytes.byteLength}`); // Log the length of the received audio bytes
            return bytes;
        } else {
            console.error('Failed to generate speech:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error in text-to-speech:', error);
        return null;
    }
}

export default textToSpeech;
