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
    <div className='mt-10  bg-blue-700 border-8 border-gray-900 w-full h-full'>
        <div className='text-center mt-10 text-5xl'>{blockName}<span > {name}</span></div>
        <div className='flex justify-center gap-20 p-10'>
          
           <div className='flex flex-col items-center w-full overflow-hidden'>
           <div className='text-4xl'> {teams[0].name.split(" ")}</div> 
           <div className={`${teams[0].result.outcome === "win" ? " text-amber-500":" text-red-700"} font-extrabold text-3xl text-center` }>{teams[0].result.outcome.toUpperCase()}</div>
           <div className='flex items-center justify-center w-full ml-10'>
            <img className=''  src={teams[0].image} width={50} height={50} alt={`imagen equipo ${teams[0].name}`}/>   
            <p className='text-2xl  ml-10'>{teams[0].result.gameWins}</p>
            </div>
           </div>

           <div className='flex flex-col items-center w-full overflow-hidden'>
           <p className='text-4xl'>{teams[1].name.split(" ")}</p>
           <p className={`${teams[1].result.outcome === "win" ? "text-blue-900":"text-red-900"} font-extrabold text-3xl text-center`}>{teams[1].result.outcome.toUpperCase()}</p>
           <div className='flex items-center justify-center w-full mr-10'>
           <p className='text-2xl mr-10'> {teams[1].result.gameWins}  </p>
            <img src={teams[1].image} width={50} height={50} alt={`imagen equipo ${teams[1].name}`}/>  
            </div>
           </div>
                 
        </div>
        <div className='text-center pb-10 flex flex-col gap-2'>
          <div className={`font-extrabold text-3xl ${state === "completed"&& "text-green-500"}`  }>{state.charAt(0).toUpperCase()+state.slice(1)}</div>
           <div className='text-xl'>{fecha}</div>
           <div className='text-xl'>{horaSinCero(hora)}</div>
        </div>
     
    </div>
  )
}

export default RecentMatch