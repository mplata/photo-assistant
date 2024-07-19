import React from 'react';
import { GoogleDrivePhoto } from '@/app/types';

interface PhotoProps {
  photo: GoogleDrivePhoto;
}

const Photo = ({ photo }: PhotoProps) => {

  if ( !photo ){
    return null;
  }

  
  return  <div className='w-1/4'>
      <img
        key={photo.id}
        src={`https://lh3.google.com/u/0/d/${photo.id}`}
        alt={photo.name}
        />
  </div>
};

export default Photo;