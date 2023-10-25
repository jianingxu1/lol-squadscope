import { useLeagues } from '@/hooks/useLeagues';
import React from 'react';

function FilterLeague({ setSelectLeague, selectLeague }) {
  const { leagues } = useLeagues();
  //console.log(leagues)
  return (
    <div className=''>
      <select
        className='w-32 cursor-pointer rounded-sm border border-grey-700 bg-blue-400 p-2 text-white'
        value={selectLeague}
        onChange={(e) => setSelectLeague(e.target.value)}
      >
        <option value='' disabled={true} className='text-center'>Filter</option>
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
