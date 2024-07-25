import React from 'react';
import { GoogleDrivePhoto } from '@/app/types';
import Photo from '../Photo';

interface PhotosContainerProps {
  photos: GoogleDrivePhoto[];
}

const PhotosContainer = ({ photos }: PhotosContainerProps) => {

  if ( photos.length === 0 ){
    return null;
  }
  
  return  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {
        photos.map(photo => <Photo key={photo.id} photo={photo}/>
        )
      }
  </div>
};

export default PhotosContainer;