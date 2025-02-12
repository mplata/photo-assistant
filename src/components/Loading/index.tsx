import React from 'react';

export type LOADING_TYPE = "photo" | "ai";


const photoLoading = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className='animate-bounce' width="96" height="96" viewBox="0 0 24 24">
    <path d="M18 10v13h-18v-13h18zm-13 2h-3v2h3v-2zm11 5c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm-4-2c-1.104 0-2 .897-2 2s.896 2 2 2 2-.897 2-2-.896-2-2-2zm-5.314-7l1.615-4.437 13.154 4.789-1.455 4v5.848l4-11.042-16.895-6.158-2.548 7h2.129z"/>
  </svg>
);

const aiLoading = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className='animate-bounce' width="96" height="96" viewBox="0 0 24 24">
    <path d="M6.215 15.873c-1.49.454-2.652 1.619-3.107 3.107-.456-1.489-1.62-2.653-3.108-3.108 1.488-.454 2.652-1.618 3.106-3.106.456 1.487 1.619 2.651 3.109 3.107zm-2.491-14.15c-.826-.252-1.472-.897-1.723-1.723-.252.825-.897 1.471-1.722 1.723.823.252 1.469.898 1.722 1.722.251-.825.897-1.471 1.723-1.722zm1.837 2.182l.732.732c1.631-1.359 3.789-2.329 5.729-2.337-1.833.458-3.645 1.663-4.947 3.12l1.653 1.653c3.76-4.365 10.845-5.486 15.272-3.073-6.549-5.092-14.585-3.287-18.439-.095zm-1.747 1.082l3.536 3.535 12.664 12.652-2.826 2.826-16.203-16.185 2.829-2.828zm-.002 1.412l-1.414 1.415 3.537 3.537 1.415-1.414-3.538-3.538zm6.408 2.123c1.005.307 1.794 1.095 2.101 2.101.307-1.005 1.096-1.793 2.101-2.101-1.005-.308-1.794-1.095-2.101-2.101-.307 1.007-1.096 1.794-2.101 2.101z"/>
  </svg>
);
const LOADING_ENUM: Record<LOADING_TYPE, any> = {
  "photo": photoLoading,
  "ai": aiLoading,
}

interface LoadingProps {
  loadingType: LOADING_TYPE;
}

const Loading = ({ loadingType }: LoadingProps) => (
  <div role="status" className='fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center'>
    {
      LOADING_ENUM[loadingType]()
    }
    <span className="sr-only">Loading...</span>
</div>
);

export default Loading;