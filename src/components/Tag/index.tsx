import React from 'react';

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <button
     className="m-1 h-12 border-black border-2 p-2.5 bg-yellow-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-full"
     >
    {text}
    </button>
  );
};

export default Tag;