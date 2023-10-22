import SepararFechaYHora from '@/app/helpers/date';
import React, { useEffect } from 'react';
const horaSinCero = (hora) => {
  let number = hora.toString();
  if (number.charAt(0) === '0') {
    number = number.slice(1);
  }

  return number;
};
function RecentMatch({ match }) {
  //console.log(match)
  const { blockName, league, match: partido, startTime, state } = match;
  const { name } = league;
  const { id, flags, teams, strategy } = partido;
  const { fecha, hora } = SepararFechaYHora(startTime);
  //element.startTime - element.state - element.league.name - element.match.teams[0].name  element.match.teams[0].image - element.match.teams[0].result.outcome - element.match.teams[0].result.gameWins - vs element.match.teams[1].name -

  return (
    <div className='h-full w-full border-4 border-gray-900 bg-blue-700'>
      <div className='mt-10 text-center text-5xl'>
        {match?.blockName}
        <span> {match?.name}</span>
      </div>

      <div className='flex justify-center gap-20 p-10'>
        <div className='flex w-full flex-col items-center overflow-hidden'>
          <p className='text-4xl'> {teams[0].name.split(' ')}</p>
          <p
            className={`${
              teams[0].result.outcome === 'win' ? ' text-amber-500' : ' text-red-700'
            } text-center text-3xl font-extrabold`}
          >
            {teams[0].result.outcome.toUpperCase()}
          </p>
          <div className='ml-10 flex w-full items-center justify-center'>
            <img
              className=''
              src={teams[0].image}
              width={50}
              height={50}
              alt={`imagen equipo ${teams[0].name}`}
            />
            <p className='ml-10  text-2xl'>{teams[0].result.gameWins}</p>
          </div>
        </div>

        <div className='flex w-full flex-col items-center overflow-hidden'>
          <p className='text-4xl'>{teams[1].name.split(' ')}</p>
          <p
            className={`${
              teams[1].result.outcome === 'win' ? 'text-blue-900' : 'text-red-900'
            } text-center text-3xl font-extrabold`}
          >
            {teams[1].result.outcome.toUpperCase()}
          </p>
          <div className='mr-10 flex w-full items-center justify-center'>
            <p className='mr-10 text-2xl'> {teams[1].result.gameWins} </p>
            <img
              src={teams[1].image}
              width={50}
              height={50}
              alt={`imagen equipo ${teams[1].name}`}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 pb-10 text-center'>
        <div className={`text-3xl font-extrabold ${state === 'completed' && 'text-green-500'}`}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </div>
        <p className='text-xl'>{fecha}</p>
        <p className='text-xl'>{horaSinCero(hora)}</p>
      </div>
    </div>
  );
}

export default RecentMatch;
