import React from 'react';
import SepararFechaYHora from '@/helpers/date';

const horaSinCero = (hora) => {
  let number = hora.toString();
  if (number.charAt(0) === '0') {
    number = number.slice(1);
  }

  return number;
};

function NextMatch({ match }) {
  const { blockName, league, match: partido, startTime, state } = match;
  const { name } = league;
  const { id, flags, teams, strategy } = partido;
  const { fecha, hora } = SepararFechaYHora(startTime);
  return (
    <div className='w-full border-4 border-gray-900 bg-blue-700  md:w-3/6 '>
      <div className='mt-10 text-center text-2xl'>
        <span> {match?.league.name} </span>
      </div>

      <div className='flex justify-center gap-20 p-10'>
        <div className='flex w-full flex-col items-center overflow-hidden'>
          <p className='text-xl md:text-3xl'> {teams[0].code.split(' ')}</p>
          <div className='flex w-full items-center justify-center '>
            <img
              className=''
              src={teams[0].image}
              width={50}
              height={50}
              alt={`imagen equipo ${teams[0].code}`}
            />
          </div>
        </div>

        <div className='flex w-full flex-col items-center overflow-hidden'>
          <p className='text-xl md:text-3xl'>{teams[1].code.split(' ')}</p>
          <div className='flex w-full items-center justify-center'>
            <img
              src={teams[1].image}
              width={50}
              height={50}
              alt={`imagen equipo ${teams[1].code}`}
            />
          </div>
        </div>
      </div>
      {state === 'inProgress' ? (
        <div className='flex flex-col gap-2 pb-10 text-center'>
          <p className='text-3xl font-bold text-red-900'>NOW</p>
        </div>
      ) : (
        <div className='flex flex-col gap-2 pb-10 text-center'>
          <p className='text-xl'>{fecha}</p>
          <p className='text-xl'>{horaSinCero(hora)}</p>
        </div>
      )}
    </div>
  );
}

export default NextMatch;
