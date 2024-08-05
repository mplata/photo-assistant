import React, { useEffect, useState } from 'react';
import { GoogleDrivePhoto } from '@/app/types';
import Photo from '../Photo';
import { AlbumEvaluation } from '@/services/openai/schemas';
import AlbumReview from '../AlbumReview';
import ShowReviewButton from '../ShowReviewButton';
import Loader from '../Loading';

interface PhotosContainerProps {
  photos: GoogleDrivePhoto[];
}

export type EvalStatus = 'NOT_EVALUATED' | 'EVALUATING' | 'EVALUATED';

const PhotosContainer = ({ photos }: PhotosContainerProps) => {

  const [evalStatus, setEvalStatus] = useState<EvalStatus>('NOT_EVALUATED');
  const [evaluation, setEvaluation] = useState<AlbumEvaluation | null>(null);
  const [showReview, setShowReview] = useState(false);

  if ( photos.length === 0 ){
    return null;
  }

  const evaluatePevaluateAlbum = async (photoIds: string[]) => {
    setEvalStatus('EVALUATING');
    try {
      const body = { photoIds };
      const response = await fetch(`/api/photos/eval`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json() as AlbumEvaluation;
      setEvaluation(data);
      setShowReview(true);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setEvalStatus('EVALUATED');
    }
  }

  useEffect(() => {
    if (photos.length > 0) {
      evaluatePevaluateAlbum(photos.map((photo) => photo.id));
    }
  }, [photos]);
  
  return  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {
        photos.map((photo,i) => (
          <Photo
            key={photo.id}
            photo={photo}
            evalStatus={evalStatus}
            evaluation={evaluation?.photos[i]}
          />
        ))
      }
      { 
        showReview && <AlbumReview evaluation={evaluation} onCloseDetail={() => setShowReview(false)}/>
      }
      { 
        (!showReview && evaluation) && <ShowReviewButton onClick={() => setShowReview(true)}/>
      }
      {
        evalStatus === 'EVALUATING' && <Loader  loadingType="ai"/>
      }
  </div>
};

export default PhotosContainer;