import React from 'react';
import FilterLeague from './FilterLeague';
import Error from '../Error';
import { useLeagues } from '@/hooks/useLeagues';
function Formulario({ error, setTeam, team, setSelectLeague, selectLeague }) {
  return (
    <form className='container mx-auto flex w-full flex-col items-center'>
      {error && <Error>{error}</Error>}
      <div className='flex w-full justify-center md:gap-2'>
        <div className='flex w-4/5 justify-center gap-5 lg:ml-10'>
          <input
            onChange={(e) => setTeam(e.target.value)}
            value={team}
            type='text'
            className='border-2 border-grey-700 focus:border-grey-700 outline-none bg-blue-700 rounded-sm text-blue-50  px-5 md:px-8 py-2'
            placeholder='Type your favorite team'
          ></input>
        </div>
        <FilterLeague setSelectLeague={setSelectLeague} selectLeague={selectLeague} />
      </div>
    </form>
  );
}

export default Formulario;
