import React from 'react';
import Tag from '../Tag';

interface AlbumReviewProps {
  onClick: () => void;
}

const AlbumReview = ({ onClick }: AlbumReviewProps) => {
  return (
    <div
      onClick={onClick}
      className=" cursor-pointer fixed top-4 right-4 w-48 px-8 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
      <div>
          <h2 className="text-2xl mb-4">Ver evaluación!</h2>
      </div>
  </div>
  );
};

export default AlbumReview;