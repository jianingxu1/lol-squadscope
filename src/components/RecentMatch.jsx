import SepararFechaYHora from '@/helpers/date';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    const {blockName,league,match:partido,startTime,state} = match;
    const {name} = league;
    const {id, flags, teams, strategy} = partido;
    const {fecha,hora}  = SepararFechaYHora(startTime);
  //  console.log(id);
    //element.startTime - element.state - element.league.name - element.match.teams[0].name  element.match.teams[0].image - element.match.teams[0].result.outcome - element.match.teams[0].result.gameWins - vs element.match.teams[1].name - 
  return (
    <>
    
  <div className='text-white flex justify-center items-center'>
  <div className='mt-10  bg-blue-700 border-8 border-gray-900 w-3/6 h-full mb-10 '>
        <div className='text-center mt-10 text-2xl'>{match?.blockName}<span > {match.league.name}</span></div>
        
          <div className='flex justify-center gap-20 p-10'>
           <div className='flex flex-col items-center'>
            <p className='text-4xl'> {teams[0].code.split(" ")}</p> 
              <p className={`${teams[0].result.outcome === "win" ? " text-amber-500":" text-red-700"} font-extrabold text-3xl text-center` }>{teams[0].result.outcome.toUpperCase()}</p>
              <div className='flex items-center justify-center '>
                <img className=''  src={teams[0].image} width={50} height={50} alt={`imagen equipo ${teams[0].name}`}/>   
                <p className='text-2xl  '>{teams[0].result.gameWins}</p>
              </div>
           </div>

           <div className='flex flex-col items-center '>
            <p className='text-4xl'>{teams[1].code.split(" ")}</p>
            <p className={`${teams[1].result.outcome === "win" ? "text-blue-900":"text-red-900"} font-extrabold text-3xl text-center`}>{teams[1].result.outcome.toUpperCase()}</p>
            <div className='flex items-center justify-center '>
              <p className='text-2xl '> {teams[1].result.gameWins}  </p>
              <img src={teams[1].image} width={50} height={50} alt={`imagen equipo ${teams[1].name}`}/>  
            </div>
           </div>
        </div>

        <div className='text-center pb-10 flex flex-col items-center gap-2'>
           <p className='text-xl'>{fecha}</p>
           <p className='text-xl'>{horaSinCero(hora)}</p>
           <button className='bg-blue-900 rounded-full text-3xl py-2 px-5 hover:bg-blue-800 transition-all duration-300' onClick={()=>router.push(`/match/${id}`)}>See match</button>
        </div>
    </div> 
  </div>
 
   </>
  )
}

export default RecentMatch