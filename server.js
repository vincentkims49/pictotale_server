import axios from 'axios';

const Constants = {
    voiceid: process.env.VOICE_ID,
    elevenLabsKey: process.env.ELEVEN_LABS_KEY
};

async function textToSpeech(text) {
    console.log('textToSpeech function called');
    console.log('VOICE_ID:', Constants.voiceid);
    console.log('ELEVEN_LABS_KEY (first 4 chars):', Constants.elevenLabsKey?.substring(0, 4));

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
        console.log('Sending request to ElevenLabs API...');
        const response = await axios.post(url, body, { headers: headers, responseType: 'arraybuffer' });
        console.log('Received response from ElevenLabs API');
        console.log('Response status:', response.status);

        if (response.status === 200) {
            const bytes = response.data;
            console.log(`Received audio bytes length: ${bytes.byteLength}`);
            return bytes;
        } else {
            console.error('Failed to generate speech:', response.data.toString());
            return null;
        }
    } catch (error) {
        console.error('Error in text-to-speech:', error.message);
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data.toString());
        }
        throw error;
    }
}

export default textToSpeech;