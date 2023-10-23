import React from 'react';

export function LoadingMatches({ children, type }) {
  return (
    <div
      className={`flex h-72 ${
        type === 'Matches' ? 'w-full ' : ' w-full text-lg'
      }  shrink-0 flex-col items-center justify-center gap-2 border-4 border-grey-700 bg-blue-700 py-1 text-center`}
    >
      <div>
        <div className='font-spiegel text-grey-100'>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoadingListOfMatches({ children, type }) {
  return (
    <div
      className={`flex h-48 ${
        type === 'Matches' ? 'w-full ' : ' w-full text-xl'
      }  shrink-0 flex-col items-center justify-center gap-2 border-4 border-grey-700 bg-blue-700 py-1 text-center`}
    >
      <div>
        <div className='font-spiegel text-grey-100'>
          {children}
        </div>
      </div>
    </div>
  );
}
