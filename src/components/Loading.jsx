import React from 'react';

function CargandoMatches({ children, type }) {
  return (
    <div
      className={`flex h-52 ${
        type === 'Matches' ? 'w-full ' : ' mt-10 h-96 w-full text-4xl'
      }  shrink-0 flex-col items-center justify-center gap-2 border-l border-t border-grey-300 bg-blue-700 py-1 text-center`}
    >
      <div>
        <div className=' font-bold text-white'>
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  );
}

export default CargandoMatches;
