import React, { useEffect, useMemo, useState } from 'react';
import { GoogleDrivePhoto } from '@/app/types';
import { PhotoEvaluation } from '@/services/openai/schemas';
import EvaluationBar from '../EvaluationBar';

interface PhotoProps {
  photo: GoogleDrivePhoto;
  evaluation: PhotoEvaluation | undefined;
  evalStatus: EvalStatus;
}

export type EvalStatus = 'NOT_EVALUATED' | 'EVALUATING' | 'EVALUATED';

const Photo = ({ photo, evaluation, evalStatus }: PhotoProps) => {

  if ( !photo ){
    return null;
  }

  const borderColor = useMemo(() => {
    return evalStatus === 'EVALUATING' ? 'bg-gradient-to-t from-rose-400 via-fuchsia-500 to-indigo-500' : 'border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]';
  }, [evalStatus]);

  return  <div className={`cursor-pointer ${borderColor} p-px`}>
    {
      evaluation && <EvaluationBar evalStatus={evalStatus} evaluation={evaluation}/>
    }
    <img className={`${evalStatus === 'EVALUATING' ? 'opacity-50':''}`}
      key={photo.id}
      src={`https://lh5.google.com/u/0/d/${photo.id}`}
      alt={photo.name}
      referrerPolicy='no-referrer'
    />
  </div>
};

export default Photo;