import React from 'react'
import FilterLeague from './FilterLeague'
import Error from '../Error'
import { useLeagues } from '@/hooks/useLeagues'
function Fomulario({error,setTeam,team,setSelectLeague,selectLeague}) {
 
  return (
    <form className='w-full mx-auto container flex flex-col items-center'>
    {error && <Error>{error}</Error>}
       <div className='flex md:gap-2 justify-center w-full'>
        <div className='lg:ml-10 w-4/5 flex justify-center gap-5'>
            <input onChange={e=>setTeam(e.target.value)} value={team} type='text' className='py-2 border-2 px-5 border-blue-100' placeholder='Write your favourite team'></input>
           
        </div>

        <FilterLeague  setSelectLeague={setSelectLeague} selectLeague={selectLeague}/>

       </div>
    </form>
  )
}

export default Fomulario