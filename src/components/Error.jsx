import React from 'react';

function Error({ children }) {
  return (
    <div className='w-fit bg-red-500 px-5 py-2 text-sm font-bold uppercase text-white'>
      {children}{' '}
    </div>
  );
}

export default Error;
