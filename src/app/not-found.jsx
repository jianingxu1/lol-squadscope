import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <div className='flex  flex-col items-center justify-center gap-10'>
      <h1 className='text-center text-3xl'>Page not found</h1>
      <div className='block'>
        <Link className='rounded-lg bg-blue-700 px-5 py-2 text-white hover:bg-blue-500' href={'/'}>
          Back to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
