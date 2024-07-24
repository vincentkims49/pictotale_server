import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

const textToSpeech = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('textToSpeech function called');
      console.log('Using voice:', process.env.VOICE_ID || 'Rachel');
      console.log('Using model:', 'eleven_turbo_v2_5');
      console.log('ELEVENLABS_API_KEY (first 4 chars):', ELEVENLABS_API_KEY?.substring(0, 4));

      const audio = await client.generate({
        voice: process.env.VOICE_ID || 'Rachel',
        model_id: 'eleven_turbo_v2_5',
        text,
      });

      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`Audio file created: ${fileName}`);
        resolve(fileName);
      });
      fileStream.on('error', (error) => {
        console.error('Error writing to file:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error in text-to-speech:', error.message);
      reject(error);
    }
  });
};

export default textToSpeech;
