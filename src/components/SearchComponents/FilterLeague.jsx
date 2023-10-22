import { useLeagues } from '@/hooks/useLeagues';
import React from 'react';

function FilterLeague({ setSelectLeague, selectLeague }) {
  const { leagues } = useLeagues();
  //console.log(leagues)
  return (
    <div className=''>
      <select
        className=' w-32 cursor-pointer rounded-xl border border-blue-100 bg-blue-200 p-2 font-bold text-white'
        value={selectLeague}
        onChange={(e) => setSelectLeague(e.target.value)}
      >
        <option value='' className='px-5 py-2'>
          --LEAGUE--
        </option>
        {leagues.map((element) => {
          return (
            <option className='bg-blue-300 font-bold' value={element.name} key={Math.random()}>
              {element.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FilterLeague;
