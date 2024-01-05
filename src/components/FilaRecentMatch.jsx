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
    <div className='bg-blue-700'>
      <div className='rounded-sm border-x-4 border-t-4 border-grey-700 bg-blue-500 py-1'>
        <div className='flex items-center justify-between overflow-hidden px-2'>
          <p className='text-left lg:text-xl'>{fecha}</p>
          <p className='text-md font-bold tracking-wider md:text-lg lg:text-xl'>
            {' '}
            {match.league.name} - <span>{blockName}</span>
          </p>
          <div>
            <button
              className='rounded-sm border-2 border-grey-700 bg-blue-700 px-2 py-1 font-spiegel text-slate-300 transition-all duration-300 hover:bg-blue-400 lg:text-md'
              onClick={() => router.push(`/match/${id}`)}
            >
              More info
            </button>
          </div>
        </div>
      </div>
      <div className='flex items-center rounded-sm border-x-4 border-b-4 border-grey-700 px-2 py-2'>
        <div className='md:text-md'>
          <span className='font-spiegel'>{hora}</span>
        </div>
        <div className='flex items-center justify-center gap-2 md:w-5/6 xl:w-5/6'>
          <div className='flex w-1/5 items-center justify-end gap-2'>
            <p className='lg:text-xl'>{teams[0].code}</p>
            <img
              className='imagen-responsive'
              src={teams[0].image}
              width={30}
              height={30}
              alt={`imagen equipo ${teams[0].name}`}
            />
          </div>

          <div className='flex gap-3 font-spiegel'>
            <p className='bg-hexblack p-1 border border-blue-500 text-2xl lg:rounded-lg lg:px-2 lg:py-2 lg:text-4xl'>
              {teams[0].result.gameWins}
            </p>
            <p className='bg-hexblack p-1 border border-blue-500 text-2xl lg:rounded-lg lg:px-2 lg:py-2 lg:text-4xl'>
              {teams[1].result.gameWins}
            </p>
          </div>

          <div className='flex w-1/5 items-center justify-center gap-2'>
            <img
              className='imagen-responsive'
              src={teams[1].image}
              width={30}
              height={30}
              alt={`imagen equipo ${teams[1].name}`}
            />
            <p className='lg:text-xl'>{teams[1].code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilaRecentMatch;
