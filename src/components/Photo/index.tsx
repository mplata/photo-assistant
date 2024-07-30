import React, { useEffect, useState } from 'react';
import { GoogleDrivePhoto } from '@/app/types';

interface PhotoProps {
  photo: GoogleDrivePhoto;
}

const Photo = ({ photo }: PhotoProps) => {

  const [isEvaluating, setEvaluating] = useState(false);

  if ( !photo ){
    return null;
  }
  
  const evaluatePhoto = async (photoId: string) => {
    setEvaluating(true);
    try {
      const body = { photoId };
      const response = await fetch(`/api/photos/eval`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log({data});
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setEvaluating(false);
    }
  }

  useEffect(() => {
    if (photo.id && !isEvaluating) {
      evaluatePhoto(photo.id);
    }
    
  }, [photo, isEvaluating]);

  return  <div className='rounded-md border-1 border-stone-800 cursor-pointer shadow-[0rem_0rem_0rem_0.125rem_#222]'>
      <img
        key={photo.id}
        src={`https://lh5.google.com/u/0/d/${photo.id}`}
        alt={photo.name}
        referrerPolicy='no-referrer'
        />
  </div>
};

export default Photo;