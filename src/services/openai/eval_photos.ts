import { generateObject } from 'ai';
import { openai } from "@ai-sdk/openai"
import PROMPTS from './prompts';
import { PhotoEvaluation, PhotoEvaluationSchema } from './schemas';
import Sharp from 'sharp';
import axios from 'axios';

const evalPhoto = async (photoId: string): Promise<PhotoEvaluation> => {
  
  const response = await axios({
    url: `https://drive.usercontent.google.com/uc?id=${photoId}&export=download`,
    responseType: 'arraybuffer'
  });
  const sharpData = Sharp(response.data);
  sharpData.resize({ width: 400 });
  
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
            image: await sharpData.toBuffer(),
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