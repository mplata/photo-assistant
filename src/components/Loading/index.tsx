import React from 'react';

const Loading = () => (
  <div role="status" className='fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center'>
    <svg xmlns="http://www.w3.org/2000/svg" className='animate-bounce' width="96" height="96" viewBox="0 0 24 24">
      <path d="M18 10v13h-18v-13h18zm-13 2h-3v2h3v-2zm11 5c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm-4-2c-1.104 0-2 .897-2 2s.896 2 2 2 2-.897 2-2-.896-2-2-2zm-5.314-7l1.615-4.437 13.154 4.789-1.455 4v5.848l4-11.042-16.895-6.158-2.548 7h2.129z"/>
      </svg>
    <span className="sr-only">Loading...</span>
</div>
);

export default Loading;