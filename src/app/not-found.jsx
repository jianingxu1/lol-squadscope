import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='flex  flex-col gap-10 justify-center items-center'>
        <h1 className='text-3xl text-center'>Page not found</h1>
        <div className='block'>
        <Link  className='text-white bg-blue-700 py-2 px-5 rounded-lg hover:bg-blue-500' href={"/"}>Back to main page</Link>
        </div>
    </div>

  )
}

export default NotFound