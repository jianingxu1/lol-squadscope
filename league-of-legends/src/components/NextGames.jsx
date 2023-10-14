import React, { useState } from 'react'

function NextGames() {
  const [cargando,setCargando] = useState(true);
  return (
    <section className=' container mx-auto mt-10'>
    <h2 className='text-white text-center text-5xl'>UPCOMING MATCH</h2>
    <div className='text-white flex justify-center items-center'>
      {
        cargando
       &&
            <div className='mt-10 h-64 bg-hexablack border-8 border-gray-900 w-full'>
            <div className='text-center my-10 text-5xl'>
             <p> NOT GAMES AVAILABLES... </p> 
            </div>
            </div>
      }
    </div>
</section>
  )
}

export default NextGames