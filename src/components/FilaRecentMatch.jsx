import SepararFechaYHora from '@/helpers/date';
import { useRouter } from 'next/navigation';
import React from 'react';

function FilaRecentMatch({ match }) {
  const router = useRouter();
  const { blockName, league, match: partido, startTime, state } = match;
  const { name } = league;
  const { id, flags, teams, strategy } = partido;
  const { fecha, hora } = SepararFechaYHora(startTime);
  return (
    <div className=' border-2 border-slate-950  bg-blue-700  '>
      <div className='border-b-2 border-b-slate-950 bg-blue-500 py-1'>
        <div className=' flex items-center justify-between overflow-hidden'>
          <p className='w-1/4 text-left lg:text-3xl'>{fecha}</p>
          <p className='text-sm font-bold lg:text-3xl '>
            {' '}
            {match.league.name} - <span>{blockName}</span>
          </p>
          <div>
            <button
              className='bg-blue-700  px-2 py-1 transition-all duration-300 hover:bg-blue-800 lg:text-2xl'
              onClick={() => router.push(`/match/${id}`)}
            >
              See match
            </button>
          </div>
        </div>
      </div>
      <div className=' flex items-center py-2'>
        <div className='w-6/6 md:w-1/6 md:text-2xl'>
          <span className=''>{hora} </span>
        </div>

        <div className='flex items-center  justify-center md:w-5/6 xl:w-5/6'>
          <div className='flex  w-1/5 items-center justify-end'>
            <p className='xl:text-4xl'>{teams[0].code}</p>
            <img
              className='imagen-responsive'
              src={teams[0].image}
              width={30}
              height={30}
              alt={`imagen equipo ${teams[0].name}`}
            />
          </div>

          <div className='flex gap-2 pl-2'>
            <p className='bg-cyan-900 text-2xl lg:rounded-lg lg:px-2 lg:py-2 lg:text-4xl'>
              {teams[0].result.gameWins}
            </p>
            <p className='bg-cyan-900 text-2xl lg:rounded-lg lg:px-2 lg:py-2 lg:text-4xl'>
              {teams[1].result.gameWins}
            </p>
          </div>

          <div className='flex w-1/5  items-center justify-center'>
            <img
              className='imagen-responsive'
              src={teams[1].image}
              width={30}
              height={30}
              alt={`imagen equipo ${teams[1].name}`}
            />
            <p className='xl:text-4xl'>{teams[1].code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilaRecentMatch;
