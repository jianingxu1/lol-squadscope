import React from 'react'

function Error({children}) {
  return (
    <div className='bg-red-500 uppercase text-sm font-bold py-2 px-5 w-fit text-white'>{children} </div>
  )
}

export default Error