import React from 'react';
import SepararFechaYHora from '@/helpers/date';

const horaSinCero = (hora) => {
  let number = hora.toString();
  if (number.charAt(0) === '0') {
    number = number.slice(1);
  }

  return number;
};

function UpcomingMatch({ match }) {
  const { blockName, league, match: partido, startTime, state } = match;
  const { name } = league;
  const { id, flags, teams, strategy } = partido;
  const { fecha, hora } = SepararFechaYHora(startTime);
  return (
    <div className='w-full border-4 border-gray-900 bg-blue-700 px-6 py-12'>
      <div className='text-center text-2xl'>
        <span className='font-spiegel text-gold-100'> {match?.league.name} </span>
      </div>

      <div className='flex justify-center'>
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
        <span className="flex items-center font-spiegel font-bold text-md tracking-widest">VS</span>
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
        <div className='flex flex-col gap-2 text-center'>
          <p className='text-3xl font-bold text-red-500'>NOW</p>
        </div>
      ) : (
        <div className='flex flex-col gap-2 text-center'>
          <span className='text-lg font-spiegel text-white tracking-wider'>{fecha}</span>
          <span className='text-lg font-spiegel'>{horaSinCero(hora)}</span>
        </div>
      )}
    </div>
  );
}

export default UpcomingMatch;
