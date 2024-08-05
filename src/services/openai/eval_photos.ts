import { generateObject, ImagePart } from 'ai';
import { openai } from "@ai-sdk/openai"
import PROMPTS from './prompts';
import { AlbumEvaluation, AlbumEvaluationSchema } from './schemas';
import Sharp from 'sharp';
import axios, { AxiosResponse } from 'axios';

type PhotoResponse = AxiosResponse<ArrayBuffer>;

const createPhotoEvaluationPromise = async (images: Sharp.Sharp[]): Promise <AlbumEvaluation> => {
  const imgObjects:ImagePart[] = await Promise.all(images.map(async (img) => {
    const buffer = await img.toBuffer();
    return {
      type: 'image',
      image: buffer,
    };
  }));
  
  const res = await generateObject<AlbumEvaluation>({
    model: openai('gpt-4o-mini'),
    schema: AlbumEvaluationSchema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: PROMPTS.EVAL_PHOTOS(imgObjects.length) },
          ...imgObjects,
        ],
      },
    ],
    system: PROMPTS.SYSTEM,
  });
  return res.object;
};

const evalPhoto = async (photoIds: string[]): Promise<AlbumEvaluation> => {
  
  const photosPromises: Promise<PhotoResponse>[] = photoIds.map((photoId: string): Promise<PhotoResponse> => (
    axios({
      url: `https://drive.usercontent.google.com/uc?id=${photoId}&export=download`,
      responseType: 'arraybuffer'
    })
  ));

  const photosResponses = await Promise.all(photosPromises);

  const sharpResponses: Sharp.Sharp[] = photosResponses.map((photoResponse): Sharp.Sharp => {
    const sharpData = Sharp(photoResponse.data);
    sharpData.resize({ width: 350 });
    return sharpData;
  });
  
  const albumEvaluation: Promise<AlbumEvaluation> = createPhotoEvaluationPromise(sharpResponses);
  return albumEvaluation;
};

export {
  evalPhoto,
};