import { useLeagues } from '@/hooks/useLeagues'
import React from 'react'

function FilterLeague({setSelectLeague,selectLeague,leagues}) {
    
    //console.log(leagues)
  return (
    <div className=''>
        <select className=' border border-blue-100 p-2 w-32 rounded-xl bg-blue-200 text-white cursor-pointer font-bold' value={selectLeague} onChange={e=>setSelectLeague(e.target.value)}>
        <option value= "" className='py-2 px-5'>--LEAGUE--</option>
            {leagues.map(element=> {
              return  <option className='font-bold bg-blue-300' value={element.name} key={element.id}>
                {element.name} 
              </option>
            }
            )}
        </select>
    </div>
  )
}

export default FilterLeague