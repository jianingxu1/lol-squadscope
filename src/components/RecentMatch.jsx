import SepararFechaYHora from '@/helpers/date';
import React, { useEffect } from 'react'
const horaSinCero = hora =>{
  let number = hora.toString();
  if(number.charAt(0) === '0')
  {
    number = number.slice(1);
  }

  return number;
 }
function RecentMatch({match}) {
    //console.log(match)
    const {blockName,league,match:partido,startTime,state} = match;
    const {name} = league;
    const {id, flags, teams, strategy} = partido;
    const {fecha,hora}  = SepararFechaYHora(startTime);
    //element.startTime - element.state - element.league.name - element.match.teams[0].name  element.match.teams[0].image - element.match.teams[0].result.outcome - element.match.teams[0].result.gameWins - vs element.match.teams[1].name - 
  
  return (
    <>
   
    <div className='mt-10  bg-blue-700 border-2 border-gray-900  md:hidden block '>
      <div className='border-b-2 border-b-slate-950 '>
        <div className=' flex justify-between '>
        <p className='text-left w-2/4'>{fecha}</p>
        <p className=' '> {match?.blockName} </p>
        <div>
            <button className='bg-blue-900 '>See match</button>
           </div>
        </div>
      </div>
        <div className=' flex items-center justify-between'>
          <span className='' >{hora} </span>
          <div className='flex gap-5 items-center'>
          <>
          <div className='flex items-center'>
          <p>{teams[0].name}</p>
          <img className=''  src={teams[0].image} width={30} height={30} alt={`imagen equipo ${teams[0].name}`}/>   
         
          <p className='text-2xl  bg-cyan-900'>{teams[0].result.gameWins}</p>
           </div>
       
          </>

          <>
          <div className='flex items-center'>
          <p className='text-2xl bg-cyan-900'>{teams[1].result.gameWins}</p>
          <img className=''  src={teams[1].image} width={30} height={30} alt={`imagen equipo ${teams[1].name}`}/>  
          <p>{teams[1].name}</p>
          </div>
          </>

          </div>
          
        </div>
    </div>

    
    <div className='mt-10  bg-blue-700 border-8 border-gray-900 w-full h-full mb-10 hidden md:block'>
        <div className='text-center mt-10 text-2xl'>{match?.blockName}<span > {match?.name}</span></div>
        
          <div className='flex justify-center gap-20 p-10'>
           <div className='flex flex-col items-center w-full overflow-hidden'>
            <p className='text-4xl'> {teams[0].name.split(" ")}</p> 
              <p className={`${teams[0].result.outcome === "win" ? " text-amber-500":" text-red-700"} font-extrabold text-3xl text-center` }>{teams[0].result.outcome.toUpperCase()}</p>
              <div className='flex items-center justify-center w-full '>
                <img className=''  src={teams[0].image} width={50} height={50} alt={`imagen equipo ${teams[0].name}`}/>   
                <p className='text-2xl  '>{teams[0].result.gameWins}</p>
              </div>
           </div>

           <div className='flex flex-col items-center w-full overflow-hidden'>
            <p className='text-4xl'>{teams[1].name.split(" ")}</p>
            <p className={`${teams[1].result.outcome === "win" ? "text-blue-900":"text-red-900"} font-extrabold text-3xl text-center`}>{teams[1].result.outcome.toUpperCase()}</p>
            <div className='flex items-center justify-center w-full'>
              <p className='text-2xl '> {teams[1].result.gameWins}  </p>
              <img src={teams[1].image} width={50} height={50} alt={`imagen equipo ${teams[1].name}`}/>  
            </div>
           </div>
        </div>

        <div className='text-center pb-10 flex flex-col gap-2'>
           <p className='text-xl'>{fecha}</p>
           <p className='text-xl'>{horaSinCero(hora)}</p>
        </div>
    </div> 
 
   </>
  )
}

export default RecentMatch