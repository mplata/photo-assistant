import https from 'https';
import { Buffer } from 'buffer';
import { generateObject } from 'ai';
import { openai } from "@ai-sdk/openai"
import PROMPTS from './prompts';
import { PhotoEvaluation, PhotoEvaluationSchema } from './schemas';
import { writeFile } from 'fs';

const saveImageFromUrl = async (url: string, outputPath: string): Promise<void> => {
  try {
    const buffer = await imageUrlToBuffer(url);
    console.log(url);
    writeFile(outputPath, buffer, (err) => {
      if (err) {
          console.error('Error al guardar la imagen:', err);
      } else {
          console.log('Imagen guardada correctamente en', outputPath);
      }
    });
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
  }
}

const imageUrlToBuffer = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data: Uint8Array[] = [];

      response.on('data', (chunk) => {
          data.push(chunk);
      });

      response.on('end', () => {
          const buffer = Buffer.concat(data);
          resolve(buffer);
      });

      response.on('error', (error) => {
          reject(error);
      });
    });
  });
}

const evalPhoto = async (url: string): Promise<PhotoEvaluation> => {
  const base64Image = await imageUrlToBuffer(url);
  console.log({base64Image});
  saveImageFromUrl(url, 'out.jpg');
  const result = await generateObject<PhotoEvaluation>({
    model: openai('gpt-4o-mini'),
    schema: PhotoEvaluationSchema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: PROMPTS.EVAL_PHOTO },
          {
            type: 'image',
            image: base64Image,
          },
        ],
      },
    ],
    system: PROMPTS.SYSTEM,
  });
  console.log(result);
  return result.object;
};

export {
  evalPhoto,
};