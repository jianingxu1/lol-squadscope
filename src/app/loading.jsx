import React from 'react';

function Loading() {
  return (
    <div
      className={`text-4xl" mt-10 flex h-screen w-full   shrink-0 flex-col items-center justify-center gap-2 border-l border-t border-grey-300 bg-blue-700 py-1`}
    >
      <div>
        <div className=' font-bold text-white'>
          <h2>Loading page...</h2>
        </div>
      </div>
    </div>
  );
}

export default Loading;
