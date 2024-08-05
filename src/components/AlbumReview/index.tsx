import React from 'react';
import { AlbumEvaluation } from '@/services/openai/schemas';
import Tag from '../Tag';

interface AlbumReviewProps {
  onCloseDetail: () => void;
  evaluation: AlbumEvaluation | null;
}

const AlbumReview = ({ evaluation, onCloseDetail }: AlbumReviewProps) => {
  if (!evaluation) {
    return null;
  }
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-192 px-8 py-4 bg-violet-300 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
      <div>
          <h1 className="text-2xl mb-4">¡Tu album ha sido revisado!, con base en tus fotos, tenemos algunos comentarios y te recomendamos 5 titulos para tu album:</h1>
          <p className='text-left my-2'>
            {
              evaluation.review
            }
          </p>
          <div className='my-4'>
            {
              evaluation.title.map((title) =>(
                  <Tag text={title}/>
              ))
            }
          </div>
          <div className="flex justify-center">
            <button
                onClick={onCloseDetail}
                className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full"
                >
            ¡Entiendo!
            </button>
          </div>
      </div>
  </div>
  );
};

export default AlbumReview;