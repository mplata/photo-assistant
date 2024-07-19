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
  
  return  <div className='flex flex-row flex-wrap gap-1'>
      {
        photos.map(photo => <Photo key={photo.id} photo={photo}/>
        )
      }
  </div>
};

export default PhotosContainer;