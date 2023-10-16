import React from 'react'
import SepararFechaYHora from '@/helpers/date';

const horaSinCero = hora =>{
  let number = hora.toString();
  if(number.charAt(0) === '0')
  {
    number = number.slice(1);
  }

  return number;
 }

   
function NextMatch({match}) {
     const {blockName,league,match:partido,startTime,state} = match;
     const {name} = league;
     const {id, flags, teams, strategy} = partido;
     const {fecha,hora}  = SepararFechaYHora(startTime);
  return (
    <div className='mt-10  bg-blue-700 border-8 border-gray-900 w-full md:w-3/6  mb-10 '>
    <div className='text-center mt-10 text-2xl'><span > {match?.league.name} </span></div>
    
      <div className='flex justify-center gap-20 p-10'>
       <div className='flex flex-col items-center w-full overflow-hidden'>
        <p className='text-xl md:text-3xl'> {teams[0].code.split(" ")}</p> 
          <div className='flex items-center justify-center w-full '>
            <img className=''  src={teams[0].image} width={50} height={50} alt={`imagen equipo ${teams[0].code}`}/>   

          </div>
         
       </div>

       <div className='flex flex-col items-center w-full overflow-hidden'>
        <p className='text-xl md:text-3xl'>{teams[1].code.split(" ")}</p>
        <div className='flex items-center justify-center w-full'>
          
          <img src={teams[1].image} width={50} height={50} alt={`imagen equipo ${teams[1].code}`}/>  
        </div>
       </div>
    </div>
    {state === "inProgress" ? 
    <div className='text-center pb-10 flex flex-col gap-2'>
       <p className='text-red-900 font-bold text-3xl'>NOW</p>
    </div> : 
    
    <div className='text-center pb-10 flex flex-col gap-2'>
       <p className='text-xl'>{fecha}</p>
       <p className='text-xl'>{horaSinCero(hora)}</p>
    </div>}
    
</div> 
  )
}

export default NextMatch