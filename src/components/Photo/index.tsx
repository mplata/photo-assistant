import React, { useEffect, useMemo, useState } from 'react';
import { GoogleDrivePhoto } from '@/app/types';
import { PhotoEvaluation } from '@/services/openai/schemas';
import EvaluationBar from '../EvaluationBar';

interface PhotoProps {
  photo: GoogleDrivePhoto;
}

export type EvalStatus = 'NOT_EVALUATED' | 'EVALUATING' | 'EVALUATED';

const Photo = ({ photo }: PhotoProps) => {

  const [evalStatus, setEvalStatus] = useState<EvalStatus>('NOT_EVALUATED');
  const [evaluation, setEvaluation] = useState<PhotoEvaluation | null>(null);

  if ( !photo ){
    return null;
  }
  
  const evaluatePhoto = async (photoId: string) => {
    setEvalStatus('EVALUATING');
    try {
      const body = { photoId };
      const response = await fetch(`/api/photos/eval`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json() as PhotoEvaluation;
      console.log('Evaluation',data);
      setEvaluation(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setEvalStatus('EVALUATED');
    }
  }

  useEffect(() => {
    if (photo.id && evalStatus === 'NOT_EVALUATED') {
      evaluatePhoto(photo.id);
    }
    
  }, [photo, evalStatus]);

  const borderColor = useMemo(() => {
    return evalStatus === 'EVALUATING' ? 'bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500' : 'shadow-[0rem_0rem_0rem_0.125rem_#222]';
  }, [evalStatus]);

  return  <div className={`rounded-md border-stone-800 cursor-pointer ${borderColor} p-px`}>
    <EvaluationBar evalStatus={evalStatus} evaluation={evaluation}/>
    <img className={`border-1 border-stone-800 ${evalStatus === 'EVALUATING' ? 'opacity-50':''}`}
      key={photo.id}
      src={`https://lh5.google.com/u/0/d/${photo.id}`}
      alt={photo.name}
      referrerPolicy='no-referrer'
    />
  </div>
};

export default Photo;