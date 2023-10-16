import SepararFechaYHora from '@/helpers/date';
import { useRouter } from 'next/navigation';
import React from 'react'

function FilaRecentMatch({match}) {
    const router = useRouter();
    const {blockName,league,match:partido,startTime,state} = match;
    const {name} = league;
    const {id, flags, teams, strategy} = partido;
    const {fecha,hora}  = SepararFechaYHora(startTime);
  return (
    <div className=' bg-blue-700 border-slate-950  border-2  '>
    <div className='border-b-2 border-b-slate-950 py-1 bg-blue-500'>
      <div className=' flex justify-between items-center '>
      <p className='text-left w-1/4 lg:text-3xl'>{fecha}</p>
      <p className='lg:text-3xl font-bold'>  {match.league.name} - <span>{blockName}</span></p>
      <div>
          <button className='bg-blue-700  lg:text-2xl hover:bg-blue-800 transition-all duration-300 px-2 py-1' onClick={()=>router.push(`/match/${id}`)}>See match</button>
         </div>
      </div>
    </div>
      <div className=' flex items-center py-2' >
        <div className='w-6/6 md:w-1/6 md:text-2xl'><span className='' >{hora} </span></div>

        <div className='flex md:w-5/6  xl:w-5/6 items-center justify-center'>

          <div className='flex  w-1/5 items-center justify-end'>
          <p className='xl:text-4xl'>{teams[0].code}</p>
          <img className='imagen-responsive'  src={teams[0].image} width={30} height={30} alt={`imagen equipo ${teams[0].name}`}/>   
          </div>

          <div className='flex pl-2 gap-2'>
          <p className='text-2xl lg:text-4xl lg:px-2 lg:py-2 lg:rounded-lg bg-cyan-900'>{teams[0].result.gameWins}</p>
          <p className='text-2xl lg:text-4xl lg:px-2 lg:py-2 lg:rounded-lg bg-cyan-900'>{teams[1].result.gameWins}</p>
          </div>

          <div className='flex w-1/5  items-center justify-center'>
          
          <img className='imagen-responsive'  src={teams[1].image} width={30} height={30} alt={`imagen equipo ${teams[1].name}`}/>  
          <p className='xl:text-4xl'>{teams[1].code}</p>
          </div>
    

        </div>
        
      </div>
  </div>
  )
}

export default FilaRecentMatch